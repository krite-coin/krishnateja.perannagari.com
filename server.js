import http from "node:http";
import fs from "node:fs";
import { promises as fsp } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const scriptsDir = path.join(__dirname, "scripts");
const sourceDir = path.join(__dirname, "source");

const PORT = 3000;
const HOST = "0.0.0.0";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

function runBuild() {
  try {
    console.log("[server] Running build...");
    execSync("node scripts/build.mjs", { cwd: __dirname, stdio: "inherit" });
    console.log("[server] Build completed successfully.");
  } catch (err) {
    console.error("[server] Build error:", err);
  }
}

// Ensure dist/ exists on boot
if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, "index.html"))) {
  runBuild();
}

// Watch source and scripts for auto-rebuilding in dev
let buildTimeout = null;
function scheduleRebuild() {
  if (buildTimeout) clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    runBuild();
  }, 150);
}

if (fs.existsSync(sourceDir)) {
  try {
    fs.watch(sourceDir, { recursive: true }, () => {
      scheduleRebuild();
    });
  } catch (e) {
    console.warn("[server] File watcher warning:", e.message);
  }
}
if (fs.existsSync(scriptsDir)) {
  try {
    fs.watch(scriptsDir, { recursive: true }, () => {
      scheduleRebuild();
    });
  } catch (e) {
    console.warn("[server] Scripts watcher warning:", e.message);
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain");
    return res.end("Method Not Allowed");
  }

  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    // Normalize path to prevent traversal attacks
    let filePath = path.join(distDir, pathname);
    let relative = path.relative(distDir, filePath);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      res.statusCode = 403;
      return res.end("Forbidden");
    }

    let stats;
    try {
      stats = await fsp.stat(filePath);
    } catch {
      // If path doesn't exist, check if filePath + '.html' exists
      if (!path.extname(filePath)) {
        try {
          const htmlPath = filePath + ".html";
          const htmlStats = await fsp.stat(htmlPath);
          if (htmlStats.isFile()) {
            filePath = htmlPath;
            stats = htmlStats;
          }
        } catch {
          // not found
        }
      }
    }

    if (stats && stats.isDirectory()) {
      if (!pathname.endsWith("/")) {
        // Redirect to trailing slash for directory URLs
        res.statusCode = 301;
        res.setHeader("Location", pathname + "/" + reqUrl.search);
        return res.end();
      }
      const indexPath = path.join(filePath, "index.html");
      try {
        const indexStats = await fsp.stat(indexPath);
        if (indexStats.isFile()) {
          filePath = indexPath;
          stats = indexStats;
        }
      } catch {
        stats = null;
      }
    }

    if (!stats || !stats.isFile()) {
      // 404 page
      const notFoundPath = path.join(distDir, "404.html");
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      try {
        const content = await fsp.readFile(notFoundPath);
        return res.end(content);
      } catch {
        return res.end("<h1>404 Not Found</h1>");
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);

    const stream = fs.createReadStream(filePath);
    stream.on("error", () => {
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });
    stream.pipe(res);
  } catch (err) {
    console.error("[server] Request handling error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
