const fs = require("fs/promises");
const path = require("path");
const { createWriteStream, createReadStream } = require("fs");
const newFile = path.join(__dirname + "/project-dist" + "/bundle.css");
const style = path.join(__dirname + "/styles");

async function addStyles() {
  const add = createWriteStream(newFile, "utf8");
  const parts = await fs.readdir(style, { withFileTypes: true });

  for (part of parts) {
    if (part.isFile() && path.extname(part.name) === ".css") {
      createReadStream(path.join(style, part.name), "utf8").pipe(add);
    }
  }
}
addStyles();
