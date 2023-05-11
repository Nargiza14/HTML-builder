const fs = require("fs");
const path = require("path");

async function copyDir(src, destination) {
  await fs.promises.mkdir(destination, { recursive: true });
  let files = await fs.promises.readdir(src, { withFileTypes: true });
  for (let file of files) {
    const srcPath = path.join(src, file.name);
    const destPath = path.join(destination, file.name);
    if (file.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}
function copyDirection(src, destination) {
  fs.rm(destination, { recursive: true, force: true }, function () {
    copyDir(src, destination);
  });
}
copyDirection(
  path.join(__dirname, "/files"),
  path.join(__dirname, "/files-copy")
);
