const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf8");

const commandsAndOutput = data.split("\n");
const maxSixe = 100000;

class Dir {
  constructor(name, parent = null) {
    this.name = name;
    this.dirs = {};
    this.files = [];
    this.parent = parent;
    this.size = 0;
  }

  addDir(dir) {
    this.dirs[dir.name] = dir;
  }
  addFile(file) {
    this.size += file.size;
    if (this.parent) {
      this.parent.addFile(file);
    }
  }
  addFileToDir(file) {
    this.files.push(file);
    this.addFile(file);
  }
}

const tree = new Dir("root");

let currentDir = tree;

const isCommand = (str) => str[0] === "$";
const isDir = (str) => str[0] === "d";

let i = 0;
while (i < commandsAndOutput.length) {
  if (isCommand(commandsAndOutput[i])) {
    const command = commandsAndOutput[i];
    const [_, action, path] = command.split(" ");
    switch (action) {
      case "cd":
        {
          if (path === "..") {
            currentDir = currentDir.parent;
          } else if (path === "/") {
            currentDir = tree;
          } else {
            currentDir = currentDir.dirs[path];
          }
        }
        break;
      default:
        break;
    }
  } else {
    const output = commandsAndOutput[i];
    if (isDir(output)) {
      const dirName = output.split(" ")[1];
      const dir = new Dir(dirName, currentDir);
      currentDir.addDir(dir);
    } else {
      const [size, fileName] = output.split(" ");
      currentDir.addFileToDir({ name: fileName, size: +size });
    }
  }
  i++;
}

console.log("🚀 ~ file: index.js:88 ~ tree", tree.size);

// find all of the directories with a total size of at most 100000
const findDirsRecursive = (dir) => {
  const dirs = [];
  const dirsThatCanBeDeleted = [];
  if (dir.size <= maxSixe) {
    dirs.push(dir);
  }
  if (tree.size - dir.size <= 40000000) {
    dirsThatCanBeDeleted.push(dir);
  }
  for (const key in dir.dirs) {
    const subDirs = findDirsRecursive(dir.dirs[key]);
    dirs.push(...subDirs.dirs);
    if (tree.size - dir.size <= 40000000) {
      dirsThatCanBeDeleted.push(...subDirs.dirsThatCanBeDeleted);
    }
  }
  return { dirs, dirsThatCanBeDeleted };
};

const { dirsThatCanBeDeleted } = findDirsRecursive(tree);
console.log(
  "🚀 ~ file: index.js:95 ~ dirsThatCanBeDeleted",
  dirsThatCanBeDeleted
);

let smallestDirThatCanBeDeleted = dirsThatCanBeDeleted.reduce((acc, dir) => {
  if (dir.size < acc.size) {
    return dir;
  }
  return acc;
});
console.log(
  "🚀 ~ file: index.js:106 ~ smallestDirThatCanBeDeleted ~ smallestDirThatCanBeDeleted",
  smallestDirThatCanBeDeleted.size
);
