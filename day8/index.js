const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

class Tree {
  constructor(height, x, y) {
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

const trees = data.split("\n").map((line, y) => {
  return line.split("").map((char, x) => {
    if (char === ".") {
      return null;
    }
    return new Tree(Number(char), x, y);
  });
});

const getTreeVisible = (tree) => {
  if (
    tree.x === 0 ||
    tree.y === 0 ||
    tree.x === trees[tree.y].length - 1 ||
    tree.y === trees.length - 1
  ) {
    return true;
  }

  // check left
  let highestTreeLeft = 0;
  for (let x = tree.x - 1; x >= 0; x--) {
    if (trees[tree.y][x] && trees[tree.y][x].height > highestTreeLeft) {
      highestTreeLeft = trees[tree.y][x].height;
    }
  }
  if (highestTreeLeft < tree.height) {
    return true;
  }

  // check right
  let highestTreeRight = 0;
  for (let x = tree.x + 1; x < trees[tree.y].length; x++) {
    if (trees[tree.y][x] && trees[tree.y][x].height > highestTreeRight) {
      highestTreeRight = trees[tree.y][x].height;
    }
  }
  if (highestTreeRight < tree.height) {
    return true;
  }

  // check top
  let highestTreeTop = 0;
  for (let y = tree.y - 1; y >= 0; y--) {
    if (trees[y][tree.x] && trees[y][tree.x].height > highestTreeTop) {
      highestTreeTop = trees[y][tree.x].height;
    }
  }
  if (highestTreeTop < tree.height) {
    return true;
  }

  // check bottom
  let highestTreeBottom = 0;
  for (let y = tree.y + 1; y < trees.length; y++) {
    if (trees[y][tree.x] && trees[y][tree.x].height > highestTreeBottom) {
      highestTreeBottom = trees[y][tree.x].height;
    }
  }
  if (highestTreeBottom < tree.height) {
    return true;
  }

  return false;
};

const visibleTrees = trees.reduce((acc, row) => {
  return acc + row.filter((tree) => tree && getTreeVisible(tree)).length;
}, 0);

console.log(visibleTrees);
