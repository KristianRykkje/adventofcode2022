const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const [stacks, commands] = input.split("\n\n");

// count how many numbers in string
const numberLine = stacks.split("\n").at(-1);
let numStack = 0;
numberLine.split(" ").forEach((num) => Number(num) > 0 && numStack++);

// split at \n and keep every third element
const stackArr = stacks
  .split("\n")
  .slice(0, numStack)
  .map((line, i) => {
    const lineElements = line
      .split("")
      .filter((el, i, arr) => (i + 1) % 4 !== 0);

    const chunked = lineElements
      .reduce((acc, el, i, arr) => {
        if (i % 3 === 0) {
          acc.push(arr.slice(i, i + 3));
        }
        return acc;
      }, [])
      .map((el) => el.join(""));

    return chunked;
  });

const stackMap = {};

for (let i = 0; i < numStack; i++) {
  stackMap[i + 1] = [];
}

for (let i = 0; i < stackArr.length; i++) {
  for (let j = 0; j < stackArr[i].length; j++) {
    stackMap[j + 1].push(stackArr[i][j]);
  }
}

Object.entries(stackMap).forEach(([key, value]) => {
  stackMap[key] = value.filter((el) => el.includes("[")).reverse();
});

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2

const commandsArr = commands.split("\n");
for (let i = 0; i < commandsArr.length; i++) {
  const [count, from, to] = commandsArr[i]
    .split(" ")
    .map((el) => Number(el))
    .filter(Number);

  // for (let j = 0; j < count; j++) {
  //   if (stackMap[from].length > 0) {
  //     const el = stackMap[from].pop();
  //     if (el) {
  //       stackMap[to].push(el);
  //     }
  //   }
  // }

  // do not move one by one, but rather move the whole stack
  if (stackMap[from].length > 0) {
    const stack = stackMap[from].splice(stackMap[from].length - count, count);
    stackMap[to].push(...stack);
  }
}

const lastElementsInStacks = Object.values(stackMap).map(
  (el, i, stackArr) => el[stackArr[i].length - 1]
);

const lastElementsInStacksAsString = lastElementsInStacks
  .map((el) => (el ? el.slice(1, -1) : undefined))
  .join("");
console.log(
  "🚀 ~ file: index.js:77 ~ lastElementsInStacksAsString",
  lastElementsInStacksAsString
);
