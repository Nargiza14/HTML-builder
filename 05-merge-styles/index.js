const fs = require("fs");
const path = require("path");

const newFile = path.join(__dirname + "/project-dist" + "/bundle.css");

fs.readdir(
  path.join(__dirname + "/styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        const extension = path.extname(
          path.join(__dirname + "/styles") + file.name
        );
        if (extension == ".css") {
          const cssFiles = new fs.ReadStream(
            path.join(__dirname + "/styles" + "/" + file.name)
          );
          cssFiles.on("data", (el) => {
            fs.appendFile(newFile, el.toString(), function (error) {
              if (error) throw error;
              console.log("Done!");
            });
          });
        }
      });
    }
  }
);
