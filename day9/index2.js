const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

const commands = data.split("\n").map((line) => {
  const [direction, value] = line.split(" ");
  return { direction, value: Number(value) };
});

const ropeLength = 9;
const ropeVisited = {};
const ropePoses = {};
for (let i = 0; i <= ropeLength; i++) {
  ropeVisited[i] = [{ x: 0, y: 0 }];
  ropePoses[i] = { x: 0, y: 0 };
}

const move = (pos, direction) => {
  const newPos = { ...pos };
  if (direction === "U") {
    newPos.y++;
  }
  if (direction === "D") {
    newPos.y--;
  }
  if (direction === "R") {
    newPos.x++;
  }
  if (direction === "L") {
    newPos.x--;
  }
  return newPos;
};

// const moveRope = (partToMove, prevPart, nextPart) => {
//   // move it so the prevPart doesn't have to move unless absolutely necessary
//   const diffInX = nextPart.x - partToMove.x;
//   const diffInY = nextPart.y - partToMove.y;
//   console.log("🚀 ~ file: index2.js:37 ~ moveRope ~ diffInX", diffInX, diffInY);

//   return { x: partToMove.x, y: partToMove.y };

// const prevDiffInX = partToMove.x - prevPart.x;
// const prevDiffInY = partToMove.y - prevPart.y;

// if (prevDiffInX === 0 && diffInY > 1) {
//   return { x: partToMove.x, y: partToMove.y + 1 };
// }
// if (prevDiffInY === 0 && diffInX > 1) {
//   return { x: partToMove.x + 1, y: partToMove.y };
// }

// if (prevDiffInX === 0 && diffInY < -1) {
//   return { x: partToMove.x, y: partToMove.y - 1 };
// }
// if (prevDiffInY === 0 && diffInX < -1) {
//   return { x: partToMove.x - 1, y: partToMove.y };
// }

// if (diffInX > 1 && diffInY > 1) {
//   return { x: partToMove.x + 1, y: partToMove.y + 1 };
// }
// if (diffInX > 1 && diffInY < -1) {
//   return { x: partToMove.x + 1, y: partToMove.y - 1 };
// }
// if (diffInX < -1 && diffInY > 1) {
//   return { x: partToMove.x - 1, y: partToMove.y + 1 };
// }
// if (diffInX < -1 && diffInY < -1) {
//   return { x: partToMove.x - 1, y: partToMove.y - 1 };
// }

// return { x: partToMove.x, y: partToMove.y };
// };

const moveRope = ({ ropeCurrent, ropeAhead }) => {
  const diffInX = ropeAhead.x - ropeCurrent.x;
  const diffInY = ropeAhead.y - ropeCurrent.y;

  if (diffInX === 0 && diffInY > 1) {
    return { x: ropeCurrent.x, y: ropeCurrent.y + 1 };
  }

  if (diffInX === 0 && diffInY < -1) {
    return { x: ropeCurrent.x, y: ropeCurrent.y - 1 };
  }

  if (diffInX > 1 && diffInY === 0) {
    return { x: ropeCurrent.x + 1, y: ropeCurrent.y };
  }

  if (diffInX < -1 && diffInY === 0) {
    return { x: ropeCurrent.x - 1, y: ropeCurrent.y };
  }

  if (diffInX >= 1 && diffInY >= 1) {
    return { x: ropeCurrent.x + 1, y: ropeCurrent.y + 1 };
  }
  if (diffInX >= 1 && diffInY <= -1) {
    return { x: ropeCurrent.x + 1, y: ropeCurrent.y - 1 };
  }
  if (diffInX <= -1 && diffInY >= 1) {
    return { x: ropeCurrent.x - 1, y: ropeCurrent.y + 1 };
  }
  if (diffInX <= -1 && diffInY <= -1) {
    return { x: ropeCurrent.x - 1, y: ropeCurrent.y - 1 };
  }

  return { x: ropeCurrent.x, y: ropeCurrent.y };
};

const shouldMoveRope = ({ ropeAhead, ropeCurrent }) => {
  if (
    ropeAhead.x - ropeCurrent.x > 1 ||
    ropeAhead.x - ropeCurrent.x < -1 ||
    ropeAhead.y - ropeCurrent.y > 1 ||
    ropeAhead.y - ropeCurrent.y < -1
  ) {
    return true;
  }
  return false;
};

for (let i = 0; i < commands.length; i++) {
  const command = commands[i];
  const { direction, value } = command;
  for (let j = 1; j <= +value; j++) {
    const newHeadPos = move(ropePoses[0], direction);
    ropeVisited[0].push(newHeadPos);
    ropePoses[0].x = newHeadPos.x;
    ropePoses[0].y = newHeadPos.y;
    for (let k = 1; k <= ropeLength; k++) {
      const ropeCurrent = ropePoses[k];
      const ropeAhead = ropePoses[k - 1];
      const shouldMove = shouldMoveRope({ ropeAhead, ropeCurrent });
      if (shouldMove) {
        const newRopeNumPos = moveRope({ ropeCurrent, ropeAhead });
        ropeVisited[k].push(newRopeNumPos);
        ropePoses[k].x = newRopeNumPos.x;
        ropePoses[k].y = newRopeNumPos.y;
      }
    }
  }
}

const ropeVisitedSets = {};
for (let i = 0; i <= ropeLength; i++) {
  ropeVisitedSets[i] = new Set();
  ropeVisited[i].forEach((pos) => {
    ropeVisitedSets[i].add(`${pos.x},${pos.y}`);
  });
}

// console.log("🚀 ~ file: index2.js:81 ~ tailVisitedSets", ropeVisitedSets);
console.log(ropeVisitedSets[0]);
console.log(ropeVisitedSets[1]);
console.log(ropeVisitedSets[2]);
console.log(ropeVisitedSets[3]);
console.log(ropeVisitedSets[ropeLength].size);
