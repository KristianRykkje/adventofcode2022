const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

const monkies = data.split("\n\n");

class Monkey {
  constructor(name, items, operation, test) {
    this.name = name;
    this.items = items;
    this.operation = operation;
    this.test = test;
  }
}

monkies.forEach((monkey) => {
  const [name, items, operation, test] = monkey.split("\n");
  const monkeyObj = new Monkey(name, items, operation, test);
  console.log("🚀 ~ file: index.js:44 ~ monkeyObj", monkeyObj);
}