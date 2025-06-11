const http = require("http");
const fs = require("fs");
const path = require("path"); // Ensure correct path resolution
const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("Error: File Not Found");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, error => {
    if (error) {
        console.log("Something went wrong:", error);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});
