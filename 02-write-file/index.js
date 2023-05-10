const fs = require("fs");
const path = require("path");

const writeStream = fs.createWriteStream(
  path.join(__dirname, "text.txt"),
  "utf8"
);

process.stdout.write("Hi! Let's write something!\n");
process.on("SIGINT", () => {
  process.stdout.write("Have a great day!");
  process.exit();
});

process.stdin.on("data", function (data) {
  if (data.toString().trim() === "exit") {
    process.stdout.write("Have a great day!");
    process.exit();
  } else {
    writeStream.write(data, "utf8");
    process.on("SIGINT", () => {
      process.stdout.write("Have a great day!");
      process.exit();
    });
  }
});
