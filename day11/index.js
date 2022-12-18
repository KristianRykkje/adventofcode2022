const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

const monkiesRaw = data.split("\n\n");

class Monkey {
  constructor(name, items, operation, test, number, divisibleBy) {
    this.name = name;
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.inspected = 0;
    this.number = number;
    this.divisibleBy = divisibleBy;
  }

  inspect() {
    this.inspected++;
  }

  addItems(items) {
    this.items.push(...items);
  }

  removeItems(items) {
    this.items = this.items.filter((item) => !items.includes(item));
  }
}

const monkies = [];

monkiesRaw.forEach((monkey) => {
  const [nameRaw, itemsRaw, operationRaw, ...testRaw] = monkey.split("\n");

  const name = nameRaw.split(":")[0];
  const number = +name.split(" ")[1];

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
  const divisibleBy = +divText.split(" ").pop();

  monkies.push(new Monkey(name, items, operation, test, number, divisibleBy));
});

const base = monkies.reduce((prev, monkey) => {
  return prev * monkey.divisibleBy;
}, 1);

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < monkies.length; j++) {
    const monkey = monkies[j];
    const itemsToRemove = [];
    for (let k = 0; k < monkey.items.length; k++) {
      const itemValue = monkey.items[k];
      itemsToRemove.push(itemValue);
      const worryLevel = itemValue % base;
      // const worryLevelB = monkey.operation(itemValue);
      // const worryLevel = (worryLevelB - (worryLevelB % 3)) / 3;
      monkey.inspect();
      const monkeyToPassTo = monkey.test(worryLevel);
      const monkeyToPassToObj = monkies.find(
        (monkey) => monkey.number === monkeyToPassTo
      );
      monkeyToPassToObj.addItems([worryLevel]);
    }
    monkey.removeItems(itemsToRemove);
  }
}

const monkiesSorted = monkies.sort((a, b) => b.inspected - a.inspected);
// console.log(monkiesSorted[0].inspected, monkiesSorted[1].inspected);
console.log(monkiesSorted[0].inspected * monkiesSorted[1].inspected);
