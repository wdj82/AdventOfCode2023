// Advent of Code day 17
// https://adventofcode.com/2023/day/17

import { PriorityQueue } from "../utils/priorityQueue";
import { rawInput } from "./rawInput";

// use for traversing the grid
const searchDirections = [
  { x: 0, y: -1, direction: "W" },
  { x: 0, y: 1, direction: "E" },
  { x: -1, y: 0, direction: "N" },
  { x: 1, y: 0, direction: "S" },
];

// return in bound adjacent coordinates
function getAdjacentCells(currX: number, currY: number, direction: string | null, height: number, width: number) {
  const result = [];

  for (let i = 0; i < searchDirections.length; i++) {
    const newDirection = searchDirections[i].direction;
    // check for reverse
    if (newDirection === "S" && direction === "N") {
      continue;
    }

    if (newDirection === "W" && direction === "E") {
      continue;
    }

    if (newDirection === "E" && direction === "W") {
      continue;
    }

    if (newDirection === "N" && direction === "S") {
      continue;
    }

    const newX = searchDirections[i].x + currX;
    const newY = searchDirections[i].y + currY;
    if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
      result.push({ newX, newY, newDirection });
    }
  }
  return result;
}

const grid = rawInput.split("\n").map((lines) => lines.split("").map(Number));
const gridHeight = grid.length;
const gridWidth = grid[0].length;

type Value = { x: number; y: number; direction: string | null; steps: number };

function findFewestSteps(isPartTwo = false) {
  const nodes = new PriorityQueue<Value>();
  const visited = new Set();
  nodes.enqueue({ x: 0, y: 0, direction: null, steps: -1 }, 0);

  while (!nodes.isEmpty()) {
    const node = nodes.dequeue();
    const distance = node.priority;
    const { x, y, steps, direction } = node.value;

    if (!isPartTwo && x === gridHeight - 1 && y === gridWidth - 1) {
      return distance;
    }

    // has to gone at least 4 blocks before it can stop in part two
    if (isPartTwo && x === gridHeight - 1 && y === gridWidth - 1 && steps >= 4) {
      return distance;
    }

    const key = `${x},${y},${direction},${steps}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    getAdjacentCells(x, y, direction, gridHeight, gridWidth).forEach(({ newX, newY, newDirection }) => {
      const newSteps = newDirection !== direction ? 1 : steps + 1;

      // part one cart cannot go more than 3 blocks in the same direction
      if (!isPartTwo && newSteps > 3) {
        return;
      }

      // part two cannot go more than 10 blocks in the same direction and cannot turn until it has gone at least 4 blocks
      if (isPartTwo && (newSteps > 10 || (direction && newDirection !== direction && steps < 4))) {
        return;
      }

      const newDistance = distance + grid[newX][newY];
      nodes.enqueue({ x: newX, y: newY, steps: newSteps, direction: newDirection }, newDistance);
    });
  }
  throw new Error("something went wrong");
}

const partOne = findFewestSteps();
console.log({ partOne });
const partTwo = findFewestSteps(true);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

