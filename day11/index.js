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
  const [nameRaw, itemsRaw, operationRaw, ...testRaw] = monkey.split("\n");

  const name = nameRaw.split(":")[0];

  const items = itemsRaw
    .split(":")[1]
    .split(",")
    .map((item) => item.trim())
    .map(Number);

  const operation = new Function(
    "old",
    "return " + operationRaw.split(":")[1].split("=")[1].trim()
  );

  const [divText, trueText, falseText] = testRaw;
  const test = new Function(
    "itemValue",
    "{\n" +
      "if (" +
      "itemValue %" +
      divText.split(" ").pop() +
      "=== 0" +
      ") {\n" +
      "return " +
      trueText.split(" ").pop() +
      "\n" +
      "} else {\n" +
      "return " +
      falseText.split(" ").pop() +
      "\n" +
      "}\n" +
      "}"
  );

  const monkeyObj = new Monkey(name, items, operation, test);
  console.log(
    "🚀 ~ file: index.js:54 ~ monkies.forEach ~ monkeyObj",
    monkeyObj
  );
});
