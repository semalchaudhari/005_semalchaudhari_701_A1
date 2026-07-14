const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {

    if (req.url === "/") {

        fs.readFile("index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });

    } else if (req.url === "/pin.jpg") {

        fs.readFile("pin.jpg", (err, data) => {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(data);
        });

    } else {

        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File Not Found");

    }

}).listen(3000);

console.log("Server running at http://localhost:3000");