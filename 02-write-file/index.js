const fs = require("fs");
const readline = require("readline");
const path = require("path");

const writeStream = () => {
  fs.createWriteStream(path.join(__dirname + `/text.txt`), (err) => {
    if (err) {
      console.log("Error!");
    }
  });
};

console.log("Hi! Let's write something!");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("pause", () => {
  console.log("Bye!");
}).on("SIGINT", () => {
  console.log("Have a great day!");
  process.exit(0);
});

rl.on("line", (input) => {
  if (input === "exit") {
    console.log("Have a great day!");
    rl.close();
  }
});
