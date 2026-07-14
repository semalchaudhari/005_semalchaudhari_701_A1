const AdmZip = require("adm-zip");

// Open the ZIP file
const zip = new AdmZip("q2.zip");

// Extract all files into the "output" folder
zip.extractAllTo("zipext", true);

console.log("ZIP file extracted successfully.");