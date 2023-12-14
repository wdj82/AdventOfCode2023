// Advent of Code day 14
// https://adventofcode.com/2023/day/14

import { rawInput } from "./rawInput";

const rocks = rawInput.split("\n").map((lines) => lines.split(""));

function moveNorth(row: number, col: number) {
  let targetRow = row;
  for (let x = row - 1; x >= 0; x--) {
    const testCell = rocks[x][col];
    if (testCell === "#" || testCell === "O") {
      break;
    }
    targetRow = x;
  }

  if (targetRow !== row) {
    rocks[row][col] = ".";
    rocks[targetRow][col] = "O";
  }
}

function moveSouth(row: number, col: number) {
  let targetRow = row;
  for (let x = row + 1; x < rocks.length; x++) {
    const testCell = rocks[x][col];
    if (testCell === "#" || testCell === "O") {
      break;
    }
    targetRow = x;
  }

  if (targetRow !== row) {
    rocks[row][col] = ".";
    rocks[targetRow][col] = "O";
  }
}

function moveWest(row: number, col: number) {
  let targetCol = col;
  for (let y = col - 1; y >= 0; y--) {
    const testCell = rocks[row][y];
    if (testCell === "#" || testCell === "O") {
      break;
    }
    targetCol = y;
  }

  if (targetCol !== col) {
    rocks[row][col] = ".";
    rocks[row][targetCol] = "O";
  }
}

function moveEast(row: number, col: number) {
  let targetCol = col;
  for (let y = col + 1; y < rocks[0].length; y++) {
    const testCell = rocks[row][y];
    if (testCell === "#" || testCell === "O") {
      break;
    }
    targetCol = y;
  }

  if (targetCol !== col) {
    rocks[row][col] = ".";
    rocks[row][targetCol] = "O";
  }
}

function countRocks() {
  let count = 0;
  for (let x = 0; x < rocks.length; x++) {
    const cost = rocks.length - x;
    for (let y = 0; y < rocks[0].length; y++) {
      if (rocks[x][y] === "O") {
        count += cost;
      }
    }
  }
  return count;
}

let partOne = 0;
let isFirst = true;

function cycleRocks() {
  for (let x = 0; x < rocks.length; x++) {
    for (let y = 0; y < rocks[0].length; y++) {
      if (rocks[x][y] === "O") {
        moveNorth(x, y);
      }
    }
  }
  if (isFirst) {
    // first time through count the rocks after shifting north for part one
    isFirst = false;
    partOne = countRocks();
  }

  for (let x = 0; x < rocks.length; x++) {
    for (let y = 0; y < rocks[0].length; y++) {
      if (rocks[x][y] === "O") {
        moveWest(x, y);
      }
    }
  }

  for (let x = rocks.length - 1; x >= 0; x--) {
    for (let y = rocks[0].length - 1; y >= 0; y--) {
      if (rocks[x][y] === "O") {
        moveSouth(x, y);
      }
    }
  }

  for (let x = rocks.length - 1; x >= 0; x--) {
    for (let y = rocks[0].length - 1; y >= 0; y--) {
      if (rocks[x][y] === "O") {
        moveEast(x, y);
      }
    }
  }
}

const savedRocks = new Map<string, number>();
const finalCycle = 1_000_000_000;
let currentStep = 0;
let cycleLength = 0;

while (currentStep < finalCycle) {
  const stringRocks = rocks.map((lines) => lines.join("")).join("\n");
  if (savedRocks.has(stringRocks)) {
    // have a grid state we've seen before
    // can calculate the length of the cycle
    // e.g. we've iterated 10 times. We saw this state on step 3. The cycle has a length of 7
    cycleLength = currentStep - (savedRocks.get(stringRocks) ?? 0);
    break;
  }
  // have not seen this state - save it and the current cycle
  savedRocks.set(stringRocks, currentStep);
  cycleRocks();
  currentStep += 1;
}

// how many more cycles to go to hit the same cycle as the final cycle
const remainingCycles = (finalCycle - currentStep) % cycleLength;

for (let i = 0; i < remainingCycles; i++) {
  cycleRocks();
}

const partTwo = countRocks();

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
