const { input } = require("./data.js");
const inputArray = input.split("\n");

const rockPaperScissorsMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const shapeScoreMap = {
  A: 1,
  B: 2,
  C: 3,
};

const youMap = {
  X: "A",
  Y: "B",
  Z: "C",
};

const outcomeScoreMap = {
  win: 6,
  tie: 3,
  loss: 0,
};

const rockPaperScissors = (you, opponent) => {
  const youShape = rockPaperScissorsMap[youMap[you]];
  const opponentShape = rockPaperScissorsMap[opponent];

  if (youShape === opponentShape) {
    return "tie";
  }

  if (youShape === "rock") {
    if (opponentShape === "paper") {
      return "loss";
    } else {
      return "win";
    }
  }

  if (youShape === "paper") {
    if (opponentShape === "scissors") {
      return "loss";
    } else {
      return "win";
    }
  }

  if (youShape === "scissors") {
    if (opponentShape === "rock") {
      return "loss";
    } else {
      return "win";
    }
  }
};

const getScore = (shape, outcome) => {
  const shapeScore = shapeScoreMap[shape];
  const outcomeScore = outcomeScoreMap[outcome];
  return shapeScore + outcomeScore;
};

// const getScoreForGame = (game) => {
//   const [opp, you] = game.trim().split(" ");
//   const outcome = rockPaperScissors(you, opp);
//   console.log("🚀 ~ file: index.js:70 ~ getScoreForGame ~ outcome", outcome);
//   const score = getScore(youMap[you], outcome);
//   return score;
// };

// const getScoreForAllGames = (games) => {
//   return games.reduce((acc, game) => {
//     return acc + getScoreForGame(game);
//   }, 0);
// };

// const score = getScoreForAllGames(inputArray);

// console.log(score);
// end part 1

const roundEndMap = {
  X: "loss",
  Y: "tie",
  Z: "win",
};

const getRoundEnd = (shape) => {
  return roundEndMap[shape];
};

const getYouShape = (opp, outcome) => {
  const oppShape = rockPaperScissorsMap[opp];

  if (oppShape === "rock") {
    if (outcome === "win") {
      return "B";
    } else if (outcome === "tie") {
      return "A";
    } else {
      return "C";
    }
  }

  if (oppShape === "paper") {
    if (outcome === "win") {
      return "C";
    } else if (outcome === "tie") {
      return "B";
    } else {
      return "A";
    }
  }

  if (oppShape === "scissors") {
    if (outcome === "win") {
      return "A";
    } else if (outcome === "tie") {
      return "C";
    } else {
      return "B";
    }
  }
};

const getScoreForGame2 = (game) => {
  const [opp, outcomeShape] = game.trim().split(" ");
  const outcome = getRoundEnd(outcomeShape);
  const youShape = getYouShape(opp, outcome);
  const score = getScore(youShape, outcome);
  return score;
};

const getScoreForAllGames2 = (games) => {
  return games.reduce((acc, game) => {
    return acc + getScoreForGame2(game);
  }, 0);
};

const score2 = getScoreForAllGames2(inputArray);

console.log(score2);
