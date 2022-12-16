const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

const commandsAndOutput = data.split("\n");
