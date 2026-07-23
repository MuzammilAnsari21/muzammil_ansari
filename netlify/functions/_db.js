// netlify/functions/_db.js
//
// MySQL connection pool. In sab environment variables ko
// Netlify Site settings -> Environment variables mein set karein:
//
//   DB_HOST      -> aapke MySQL server ka host (jaise sql123.hosting.com)
//   DB_PORT      -> (optional) default 3306
//   DB_USER      -> MySQL username
//   DB_PASSWORD  -> MySQL password
//   DB_NAME      -> database ka naam
//   DB_SSL       -> (optional) "true" agar aapka provider SSL connection maangta hai
//
// NOTE: Netlify Functions serverless hain, isliye aapka MySQL server
// remote/public connections accept karta hona chahiye (sirf localhost
// tak limited nahi hona chahiye), warna function connect nahi kar payega.

import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 0,
      ssl:
        process.env.DB_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
    });
  }
  return pool;
}

export function assertEnv() {
  const missing = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"].filter(
    (k) => !process.env[k]
  );
  if (missing.length) {
    throw new Error(
      `Server misconfigured: ye environment variables set nahi hain: ${missing.join(", ")}`
    );
  }
}
