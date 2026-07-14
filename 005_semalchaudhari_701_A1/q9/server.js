const fs = require("fs");

// Create a file
fs.writeFile("demo.txt", "Hello Node.js\n", (err) => {
    if (err) throw err;
    console.log("File created.");

    // Append data
    fs.appendFile("demo.txt", "Welcome to FS Module.\n", (err) => {
        if (err) throw err;
        console.log("Data appended.");

        // Read file
        fs.readFile("demo.txt", "utf8", (err, data) => {
            if (err) throw err;
            console.log("File Content:");
            console.log(data);

            // Rename file
            fs.rename("demo.txt", "sample.txt", (err) => {
                if (err) throw err;
                console.log("File renamed.");

                // Delete file
                fs.unlink("sample.txt", (err) => {
                    if (err) throw err;
                    console.log("File deleted.");
                });
            });
        });
    });
});