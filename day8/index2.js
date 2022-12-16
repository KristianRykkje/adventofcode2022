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

const getTreeScene = (tree) => {
  const scene = {
    left: 1,
    right: 1,
    top: 1,
    bottom: 1,
  };
  if (tree.x === 0) {
    scene.left = 0;
  }
  if (tree.y === 0) {
    scene.top = 0;
  }
  if (tree.x === trees[tree.y].length - 1) {
    scene.right = 0;
  }
  if (tree.y === trees.length - 1) {
    scene.bottom = 0;
  }

  // check left
  for (let x = tree.x - 1; x >= 0; x--) {
    const treeLeft = trees[tree.y][x];
    if (treeLeft && treeLeft.height >= tree.height) {
      scene.left = tree.x - x;
      break;
    }
    if (x === 0) {
      scene.left = tree.x;
    }
  }

  // check right
  for (let x = tree.x + 1; x < trees[tree.y].length; x++) {
    const treeRight = trees[tree.y][x];
    if (treeRight && treeRight.height >= tree.height) {
      scene.right = x - tree.x;
      break;
    }
    if (x === trees[tree.y].length - 1) {
      scene.right = trees[tree.y].length - 1 - tree.x;
    }
  }

  // check top
  for (let y = tree.y - 1; y >= 0; y--) {
    const treeTop = trees[y][tree.x];
    if (treeTop && treeTop.height >= tree.height) {
      scene.top = tree.y - y;
      break;
    }
    if (y === 0) {
      scene.top = tree.y;
    }
  }

  // check bottom
  for (let y = tree.y + 1; y < trees.length; y++) {
    const treeBottom = trees[y][tree.x];
    if (treeBottom && treeBottom.height >= tree.height) {
      scene.bottom = y - tree.y;
      break;
    }
    if (y === trees.length - 1) {
      scene.bottom = trees.length - 1 - tree.y;
    }
  }

  return scene;
};

const calcSceneScore = (scene) => {
  const score = scene.left * scene.right * scene.top * scene.bottom;
  return score;
};

// get tree with highest score
let highestScore = 0;
let highestScoreTree = null;
let bestScene = null;
for (let y = 0; y < trees.length; y++) {
  for (let x = 0; x < trees[y].length; x++) {
    const tree = trees[y][x];
    if (tree) {
      const scene = getTreeScene(tree);
      const score = calcSceneScore(scene);
      if (score > highestScore) {
        highestScore = score;
        highestScoreTree = tree;
        bestScene = scene;
      }
    }
  }
}

console.log(highestScoreTree);
console.log(highestScore);
console.log(bestScene);
