//this is the demo file, which needs to be delete!

const fs = require("fs");
const util = require("util");

// Convert fs.unlink() into a Promise
const unlinkFile = util.promisify(fs.unlink);

// Call the promisified function
unlinkFile("demo1.txt")
    .then(() => {
        console.log("File deleted successfully.");
    })
    .catch((err) => {
        console.log("Error:", err.message);
    });