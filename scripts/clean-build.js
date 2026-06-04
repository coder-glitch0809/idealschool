const fs = require("fs");
const path = require("path");

const finalBundle = path.resolve(__dirname, "..", "dist", "app.js");

if (fs.existsSync(finalBundle)) {
    const sizeKb = (fs.statSync(finalBundle).size / 1024).toFixed(1);
    console.log(`Built obfuscated runtime: dist/app.js (${sizeKb} KB)`);
}
