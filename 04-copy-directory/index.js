const fs = require("fs");
const path = require("path");

fs.mkdir(
  path.join(__dirname + "/files-copy"),
  { recursive: true },
  function copyDir(err) {
    if (err) throw err;
    console.log("Clone folder");
    fs.readdir(path.join(__dirname + "/files"), "utf8", function (error, data) {
      for (const key in data) {
        fs.copyFile(
          path.join(__dirname + "/files" + "/" + data[key]),
          path.join(__dirname + "/files-copy" + "/" + data[key]),
          (err) => {
            if (err) throw err;
            console.log("Done!");
          }
        );
      }
    });
  }
);
