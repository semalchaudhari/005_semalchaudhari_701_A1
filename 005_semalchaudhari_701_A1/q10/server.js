// Print file and directory name
console.log("__filename:", __filename);
console.log("__dirname :", __dirname);

// Print command-line arguments
console.log("\nCommand Line Arguments:");

for (let i = 2; i < process.argv.length; i++) {
    console.log(process.argv[i]);
}

// Use setTimeout (Global Object)
setTimeout(() => {
    console.log("\nThis message is displayed after 2 seconds.");
}, 2000);