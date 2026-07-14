import fs from "node:fs";
import { ZipArchive } from "archiver";

const output = fs.createWriteStream("q2.zip");

// Create ZIP archive
const zip = new ZipArchive();

zip.pipe(output);

// Add the folder
zip.directory("q2", false);

// Finalize the archive
await zip.finalize();

output.on("close", () => {
    console.log("ZIP file created successfully.");
});