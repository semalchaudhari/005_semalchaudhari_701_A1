const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // Serve HTML page
    if (req.url === "/" && req.method === "GET") {

        fs.readFile("index.html", (err, data) => {

            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading file");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // GET Route
    else if (req.url === "/gethello" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Hello NodeJS!!");
    }

    // Invalid Route
    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});