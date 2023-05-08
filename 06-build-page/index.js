const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  fs.readdir(src, { withFileTypes: true }, function (err, files) {
    if (err) throw err;
    files.forEach((file) => {
      if (!file.isFile()) {
        fs.stat(path.join(dest, file.name), function (err) {
          if (err) {
            fs.mkdir(path.join(dest, file.name), function (err) {
              if (err) {
                return console.log(err);
              }
            });
            copyDir(`${src}/${file.name}`, path.join(dest, file.name));
          } else {
            copyDir(`${src}/${file.name}`, path.join(dest, file.name));
          }
        });
      } else {
        fs.copyFile(
          `${src}/${file.name}`,
          `${dest}/${file.name}`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    });
  });
}

fs.stat(path.join(__dirname + "/project-dist"), (err) => {
  if (err) {
    fs.mkdir(path.join(__dirname + "/project-dist"), (err) => {
      if (err) {
        return console.log(err);
      }
    });
    copyHTML();
  } else {
    fs.readdir(path.join(__dirname + "/project-dist"), (err) => {
      if (err) {
        console.log(err);
      } else {
        copyHTML();
      }
    });
  }
});

function copyHTML() {
  fs.copyFile(
    `${__dirname}/template.html`,
    `${__dirname + "/project-dist"}/index.html`,
    function (err) {
      if (err) throw err;
      fs.readFile(
        `${__dirname + "/project-dist"}/index.html`,
        "utf8",
        (err, data) => {
          if (err) throw err;
          fs.readdir(
            path.join(__dirname + "/components"),
            {
              withFileTypes: true,
            },
            (err, files) => {
              if (err) throw err;
              files.forEach((file) => {
                fs.readFile(
                  `${path.join(__dirname + "/components")}/${file.name}`,
                  "utf8",
                  function (err, dataFile) {
                    if (err) throw err;
                    const tag = `${file.name.split(".")[0]}`;
                    data = data.replace(tag, dataFile);
                    fs.writeFile(
                      `${path.join(__dirname + "/project-dist")}/index.html`,
                      data,
                      (err) => {
                        if (err) console.log(err);
                      }
                    );
                  }
                );
              });
            }
          );
        }
      );
    }
  );
}

fs.stat(path.join(__dirname + "/project-dist" + "/assets"), (err) => {
  if (err) {
    fs.mkdir(path.join(__dirname + "/project-dist" + "/assets"), (err) => {
      if (err) {
        return console.log(err);
      }
    });
    copyDir(
      path.join(__dirname + "/assets"),
      path.join(__dirname + "/project-dist" + "/assets")
    );
  } else {
    copyDir(
      path.join(__dirname + "/assets"),
      path.join(__dirname + "/project-dist" + "/assets")
    );
  }
});

fs.readdir(
  path.join(__dirname + "/styles"),
  { withFileTypes: true },
  async (err, filenames) => {
    if (err) throw err;
    else {
      filenames.forEach((filename, index) => {
        const cssPath = path.join(
          path.join(__dirname + "/styles"),
          filename.name
        );
        if (filename.isFile() && filename.name.split(".")[1] === "css") {
          fs.readFile(cssPath, "utf8", (err, data) => {
            if (err) {
              console.log(err);
            } else if (index === 0) {
              fs.writeFile(
                path.join(__dirname + "/project-dist" + "/style.css"),
                data,
                (err) => {
                  if (err) throw err;
                }
              );
            } else {
              fs.appendFile(
                path.join(
                  path.join(__dirname + "/project-dist" + "/style.css")
                ),
                data,
                (err) => {
                  if (err) console.log(err);
                }
              );
            }
          });
        }
      });
    }
  }
);
