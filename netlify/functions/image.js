// netlify/functions/image.js
//
// GET /api/image/:id -> MySQL "images" table se image ko binary ke tor par
// serve karta hai, sahi Content-Type ke saath. Ye woh URL hai jo
// upload-image.js return karta hai aur content.json mein save hota hai.

import { getPool, assertEnv } from "./_db.js";

export default async (req, context) => {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts[parts.length - 1];

  const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (!id || Number.isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: "Invalid image id" }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  try {
    assertEnv();
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT mimetype, data FROM images WHERE id = ? LIMIT 1",
      [id]
    );

    if (!rows.length) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
        headers: jsonHeaders,
      });
    }

    const { mimetype, data } = rows[0];

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": mimetype || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
};
