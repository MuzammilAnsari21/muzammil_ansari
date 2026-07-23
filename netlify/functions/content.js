// netlify/functions/content.js
//
// GET  /.netlify/functions/content  -> GitHub se content.json ka current content laata hai
// POST /.netlify/functions/content  -> body ko GitHub repo mein content.json par commit karta hai
//
// Zaroori Environment Variables (Netlify site settings -> Environment variables mein add karein):
//   GITHUB_TOKEN  -> GitHub Personal Access Token (repo scope ke saath)
//   GITHUB_OWNER  -> aapka GitHub username / org
//   GITHUB_REPO   -> repo ka naam
//   GITHUB_BRANCH -> (optional) branch, default "main"

const GITHUB_API = "https://api.github.com";

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH || "main";
const token = process.env.GITHUB_TOKEN;
const filePath = "content.json";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function githubHeaders() {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function getFile() {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const res = await fetch(url, { headers: githubHeaders() });
  if (res.status === 404) {
    return { content: null, sha: null };
  }
  if (!res.ok) {
    throw new Error(`GitHub GET failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return { content: decoded, sha: data.sha };
}

async function putFile(newContentString, sha) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  const body = {
    message: "chore: update portfolio content.json via admin panel",
    content: Buffer.from(newContentString, "utf-8").toString("base64"),
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`GitHub PUT failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

export default async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (!owner || !repo || !token) {
    return new Response(
      JSON.stringify({
        error:
          "Server misconfigured: GITHUB_OWNER, GITHUB_REPO ya GITHUB_TOKEN environment variable set nahi hai.",
      }),
      { status: 500, headers }
    );
  }

  try {
    if (req.method === "GET") {
      const { content } = await getFile();
      return new Response(content || "{}", { status: 200, headers });
    }

    if (req.method === "POST") {
      const bodyText = await req.text();
      // Validate JSON before writing
      JSON.parse(bodyText);

      const { sha } = await getFile();
      await putFile(bodyText, sha);

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers,
      });
    }

    return new Response("Method Not Allowed", { status: 405, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers,
    });
  }
};
