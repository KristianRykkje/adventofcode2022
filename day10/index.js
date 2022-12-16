const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

const commands = data.split("\n");

const cycleStrengthArr = [];
let cycleStrength = 0;
let cycle = 0;
let x = 1;

let output = "";
let row = 0;

const inSprit = () => {
  const spritePos = cycle % 40;
  const spirtePoses = [];
  if (spritePos === 0) {
    spirtePoses.push(0, 1, 2);
  } else if (spritePos === 39) {
    spirtePoses.push(39, 38, 37);
  } else {
    spirtePoses.push(spritePos, spritePos - 1, spritePos + 1);
  }

  return spirtePoses.includes(x);
};

const cycleFn = () => {
  if (cycle % 40 === 0) {
    row++;
    output += "\n";
  }
  if (inSprit()) {
    output += "#";
  } else {
    output += ".";
  }
  cycle++;
  cycleStrength = cycle * x;
  if (cycle % 20 === 0) {
    cycleStrengthArr.push({ cycle, strength: cycleStrength });
  }
};

for (let i = 0; i < commands.length; i++) {
  const command = commands[i];
  if (command === "noop") {
    cycleFn();
    continue;
  }

  const [action, value] = command.split(" ");

  for (let j = 0; j <= 1; j++) {
    cycleFn();
    if (j === 1) {
      x += +value;
    }
  }
  console.log("🚀 ~ file: index.js:44 ~ x", x);
}

const sumOfCycleStrengts = (cycles) => {
  let sum = 0;
  cycles.forEach((cycle) => {
    const cycleStrength = cycleStrengthArr.find(
      (c) => c.cycle === cycle
    ).strength;
    sum += cycleStrength;
  });
  return sum;
};

// console.log(
//   "🚀 ~ file: index.js:9 ~ sumOfCycleStrengts",
//   sumOfCycleStrengts(cyclesToFind)
// );

console.log(output);
