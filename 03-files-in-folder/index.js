const fs = require("fs");
const path = require("path");

fs.promises
  .readdir(path.join(__dirname + `/secret-folder`), { withFileTypes: true })
  .then((filenames) => {
    for (let filename of filenames) {
      console.log(filename);
    }
  })
  .catch((err) => {
    console.log(err);
  });
