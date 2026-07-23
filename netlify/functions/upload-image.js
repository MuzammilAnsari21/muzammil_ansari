// netlify/functions/upload-image.js
//
// POST /api/upload-image
// Body: { filename, dataBase64 (bina "data:...;base64," prefix ke), contentType }
//
// Image ko MySQL "images" table mein binary (LONGBLOB) ke tor par save karta hai
// aur { url: "/api/image/<id>" } return karta hai. content.json mein sirf ye
// chota URL save hota hai — base64 kabhi bhi content JSON mein nahi jata.

import { getPool, assertEnv } from "./_db.js";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export default async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers });
  }

  try {
    assertEnv();

    const { filename, dataBase64, contentType } = await req.json();
    if (!filename || !dataBase64) {
      return new Response(
        JSON.stringify({ error: "filename aur dataBase64 zaroori hain." }),
        { status: 400, headers }
      );
    }

    const approxBytes = (dataBase64.length * 3) / 4;
    if (approxBytes > MAX_BYTES) {
      return new Response(
        JSON.stringify({ error: "Image bohot bari hai (max ~8MB)." }),
        { status: 400, headers }
      );
    }

    const buffer = Buffer.from(dataBase64, "base64");
    const pool = getPool();

    const [result] = await pool.query(
      "INSERT INTO images (filename, mimetype, data) VALUES (?, ?, ?)",
      [filename, contentType || "application/octet-stream", buffer]
    );

    const url = `/api/image/${result.insertId}`;

    return new Response(JSON.stringify({ ok: true, url }), {
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
