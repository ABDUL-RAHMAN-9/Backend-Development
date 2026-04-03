/**
 * app.js - Modern ES Module HTTP Server
 * Utilizing ES6 Imports and advanced Node.js path resolution.
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// In ES Modules, __dirname is not defined by default.
// This is the "Professional" way to reconstruct it:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Logging utility to track site traffic in the terminal
const logger = (req) => {
    const date = new Date().toLocaleString();
    console.log(`[${date}] ${req.method} request received for: ${req.url}`);
};

// Robust function to handle file serving logic
const serveStaticFile = (filePath, contentType, res) => {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === "ENOENT") {
                // Handle 404 - File Not Found
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end(
                    "<h1>404: Page Not Found</h1><p>The resource you are looking for does not exist.</p>",
                );
            } else {
                // Handle 500 - Server Error
                res.writeHead(500);
                res.end(`Internal Server Error: ${error.code}`);
            }
        } else {
            // Success 200
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
};

// Create the server instance
const server = http.createServer((req, res) => {
    logger(req);

    // Basic Routing Logic
    if (req.url === "/" || req.url === "/index.html") {
        // Update filePath 
        const filePath = path.join(__dirname, "..", "interface", "index.html");
        serveStaticFile(filePath, "text/html", res);
    } else if (req.url === "/api/info") {
        // Example of a JSON API endpoint
        const serverInfo = {
            message: "Welcome to the Backend Development API",
            status: "Online",
            nodeVersion: process.version,
            platform: process.platform,
        };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(serverInfo));
    } else {
        // Attempt to serve any other file (like CSS or Images) requested
        const ext = path.extname(req.url);
        let contentType = "text/html";

        switch (ext) {
            case ".js":
                contentType = "text/javascript";
                break;
            case ".css":
                contentType = "text/css";
                break;
            case ".json":
                contentType = "application/json";
                break;
            case ".png":
                contentType = "image/png";
                break;
            case ".jpg":
                contentType = "image/jpg";
                break;
        }

        const filePath = path.join(__dirname, req.url);
        serveStaticFile(filePath, contentType, res);
    }
});

// Start listening
server.listen(PORT, () => {
    console.log(
        `\x1b[32m%s\x1b[0m`,
        `>>> Server is live at http://localhost:${PORT}`,
    );
    console.log(`Press Ctrl+C to shut down the server safely.`);
});

// Catching unhandled server errors
server.on("error", (err) => {
    console.error("Critical Server Error:", err.message);
});
