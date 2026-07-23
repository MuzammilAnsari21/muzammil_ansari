// netlify/functions/upload-image.js
//
// POST /.netlify/functions/upload-image
// Body: { filename: "hero.png", dataBase64: "<base64 without data: prefix>", contentType: "image/png" }
//
// GitHub repo ke andar public/images/<timestamp>-<filename> par file commit karta hai
// aur wapis { url: "<raw githubusercontent url>" } deta hai.
//
// Same environment variables use karta hai jo content.js function use karta hai:
//   GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH

const GITHUB_API = "https://api.github.com";

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH || "main";
const token = process.env.GITHUB_TOKEN;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function githubHeaders() {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export default async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers });
  }

  if (!owner || !repo || !token) {
    return new Response(
      JSON.stringify({
        error:
          "Server misconfigured: GITHUB_OWNER, GITHUB_REPO ya GITHUB_TOKEN set nahi hai.",
      }),
      { status: 500, headers }
    );
  }

  try {
    const { filename, dataBase64 } = await req.json();

    if (!filename || !dataBase64) {
      return new Response(
        JSON.stringify({ error: "filename aur dataBase64 zaroori hain." }),
        { status: 400, headers }
      );
    }

    // Size guard: base64 ~1.37x asli size hota hai, isliye ~5MB tak allow karte hain
    const approxBytes = (dataBase64.length * 3) / 4;
    if (approxBytes > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "Image bohot bari hai (max ~5MB)." }),
        { status: 400, headers }
      );
    }

    const safeName = `${Date.now()}-${sanitizeFilename(filename)}`;
    const path = `public/images/${safeName}`;

    const putRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: githubHeaders(),
        body: JSON.stringify({
          message: `chore: upload image ${safeName} via admin panel`,
          content: dataBase64,
          branch,
        }),
      }
    );

    if (!putRes.ok) {
      const errText = await putRes.text();
      throw new Error(`GitHub upload failed: ${putRes.status} ${errText}`);
    }

    // Raw GitHub URL - turant available hoti hai, Netlify rebuild ka wait nahi karna padta
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

    return new Response(JSON.stringify({ ok: true, url: rawUrl, path }), {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers,
    });
  }
};
