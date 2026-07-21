/**
 * Vite plugin: simple file-based content API
 *   GET  /api/content  → returns content.json (or {} if not found)
 *   POST /api/content  → writes body JSON to content.json
 */
import fs from "fs";
import path from "path";

export default function contentApiPlugin(rootDir) {
  const filePath = path.resolve(rootDir, "content.json");

  return {
    name: "content-api",
    configureServer(server) {
      server.middlewares.use("/api/content", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.writeHead(204);
          res.end();
          return;
        }

        if (req.method === "GET") {
          try {
            if (!fs.existsSync(filePath)) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end("{}");
              return;
            }
            const data = fs.readFileSync(filePath, "utf-8");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              // Validate JSON before writing
              JSON.parse(body);
              fs.writeFileSync(filePath, body, "utf-8");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        res.writeHead(405);
        res.end("Method Not Allowed");
      });
    },
  };
}
