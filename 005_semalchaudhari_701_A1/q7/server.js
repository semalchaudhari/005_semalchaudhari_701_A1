const http = require("http");

const server = http.createServer(async (req, res) => {

    if (req.url === "/google") {

        try {
            // Fetch Google's homepage
            const response = await fetch("https://www.google.com");

            // Read response as text
            const data = await response.text();

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);

        } catch (err) {

            res.writeHead(500, {
                "Content-Type": "text/plain"
            });

            res.end("Error: " + err.message);

        }

    } else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("Page Not Found");

    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});