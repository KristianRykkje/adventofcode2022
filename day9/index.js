const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

const commands = data.split("\n").map((line) => {
  const [direction, value] = line.split(" ");
  return { direction, value: Number(value) };
});

const headPos = { x: 0, y: 0 };
const tailPos = { x: 0, y: 0 };

const headVisited = [{ x: 0, y: 0 }];
const tailVisited = [{ x: 0, y: 0 }];

const move = (pos, direction) => {
  const newPos = { ...pos };
  if (direction === "U") {
    newPos.y++;
  }
  if (direction === "D") {
    newPos.y--;
  }
  if (direction === "L") {
    newPos.x++;
  }
  if (direction === "R") {
    newPos.x--;
  }
  return newPos;
};

const moveTail = (pos) => {
  const newPos = { ...pos };
  return newPos;
};

const shouldMoveTail = (headPos, tailPos) => {
  if (
    headPos.x - tailPos.x > 1 ||
    headPos.x - tailPos.x < -1 ||
    headPos.y - tailPos.y > 1 ||
    headPos.y - tailPos.y < -1
  ) {
    return true;
  }
  return false;
};

for (let i = 0; i < commands.length; i++) {
  const command = commands[i];
  const { direction, value } = command;
  for (let j = 1; j <= +value; j++) {
    const newHeadPos = move(headPos, direction);
    headVisited.push(newHeadPos);
    headPos.x = newHeadPos.x;
    headPos.y = newHeadPos.y;
    if (shouldMoveTail(newHeadPos, tailPos)) {
      const newTailPos = moveTail(headVisited[headVisited.length - 2]);
      tailVisited.push(newTailPos);
      tailPos.x = newTailPos.x;
      tailPos.y = newTailPos.y;
    }
  }
}

const tailVisitedSet = new Set();
tailVisited.forEach((pos) => {
  tailVisitedSet.add(`${pos.x},${pos.y}`);
});

// console.log(headVisited);
// console.log(tailVisited);
console.log(tailVisitedSet.size);
