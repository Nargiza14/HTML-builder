const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname + `/secret-folder`),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (!file.isDirectory()) {
          fs.stat(path.join(__dirname + `/secret-folder`), (error, stats) => {
            if (error) {
              console.log(error);
            } else {
              let name = file.name.split(".", 1).toString();
              let extension = path
                .extname(path.join(__dirname + `/secret-folder`) + file.name)
                .replace(".", "");
              let size = stats.size + "b";
              console.log(name + "-" + extension + "-" + size);
            }
          });
        }
      });
    }
  }
);
