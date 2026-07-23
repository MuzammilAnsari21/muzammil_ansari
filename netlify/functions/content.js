// netlify/functions/content.js
//
// GET  /api/content  -> MySQL se saved content JSON laata hai
// POST /api/content  -> body ko MySQL mein save karta hai (JSON validate karke)
//
// Table: site_content (id INT PRIMARY KEY, data JSON NOT NULL)
// Schema setup ke liye schema.sql dekhein.

import { getPool, assertEnv } from "./_db.js";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function toObject(data) {
  if (data == null) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return data;
}

export default async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    assertEnv();
    const pool = getPool();

    if (req.method === "GET") {
      const [rows] = await pool.query(
        "SELECT data FROM site_content WHERE id = 1 LIMIT 1"
      );
      const data = rows.length ? toObject(rows[0].data) : {};
      return new Response(JSON.stringify(data), { status: 200, headers });
    }

    if (req.method === "POST") {
      const bodyText = await req.text();
      const parsed = JSON.parse(bodyText); // validate JSON

      await pool.query(
        `INSERT INTO site_content (id, data) VALUES (1, ?)
         ON DUPLICATE KEY UPDATE data = VALUES(data)`,
        [JSON.stringify(parsed)]
      );

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
