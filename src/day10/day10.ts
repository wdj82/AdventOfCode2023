// Advent of Code day 10
// https://adventofcode.com/2023/day/10

import { rawInput } from "./rawInput";

// | = N to S
// - = E to W
// L = N to E
// J = N to W
// 7 = S to W
// F = S to E
// S = start - not calculated just looking at the input to figure out which tile S really is
// . = ground

const pipeTiles = ["|", "-", "L", "J", "7", "F", "S"] as const;

type Pipes = (typeof pipeTiles)[number];

const pipes: Record<Pipes, { x: number; y: number }[]> = {
  "|": [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ],
  "-": [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ],
  L: [
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ],
  J: [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ],
  "7": [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
  ],
  F: [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ],
  // by hand
  S: [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ],
};

const bigParts = {
  "|": [
    [".", "|", "."],
    [".", "|", "."],
    [".", "|", "."],
  ],
  "-": [
    [".", ".", "."],
    ["-", "-", "-"],
    [".", ".", "."],
  ],
  L: [
    [".", "|", "."],
    [".", "L", "-"],
    [".", ".", "."],
  ],
  J: [
    [".", "|", "."],
    ["-", "J", "."],
    [".", ".", "."],
  ],
  "7": [
    [".", ".", "."],
    ["-", "7", "."],
    [".", "|", "."],
  ],
  F: [
    [".", ".", "."],
    [".", "F", "-"],
    [".", "|", "."],
  ],
  // by hand again
  S: [
    [".", "|", "."],
    [".", "S", "."],
    [".", "|", "."],
  ],
  ".": [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ],
};

// use for traversing the eight directions of the grid
const searchDirections = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
];

// return in bound adjacent coordinates
function getAdjacentCells(currX: number, currY: number, gridHeight: number, gridWidth: number) {
  const result = [];

  for (let i = 0; i < searchDirections.length; i++) {
    const newX = searchDirections[i].x + currX;
    const newY = searchDirections[i].y + currY;
    if (newX >= 0 && newX < gridHeight && newY >= 0 && newY < gridWidth) {
      result.push({ newX, newY });
    }
  }
  return result;
}

function getNextPipe(currentPipe: Pipes, currX: number, currY: number, height: number, width: number) {
  const result = [];
  const searchDirections = pipes[currentPipe];

  for (let i = 0; i < searchDirections.length; i++) {
    const newX = searchDirections[i].x + currX;
    const newY = searchDirections[i].y + currY;
    if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
      result.push({ newX, newY });
    }
  }
  return result;
}

const grid = rawInput.split("\n").map((lines) => lines.split(""));

const gridHeight = grid.length;
const gridWidth = grid[0].length;

function findStart(grid: (string | number)[][]) {
  const start = { x: 0, y: 0 };
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "S") {
        start.x = x;
        start.y = y;
      }
    }
  }
  return start;
}

// bfs search
function findMaxDistance() {
  const start = findStart(grid);

  let maxDistance = 0;
  const stack = [{ x: start.x, y: start.y }];
  const distances: number[][] = [...Array(gridHeight)].map(() => Array(gridWidth).fill(Infinity));
  distances[start.x][start.y] = 0;

  while (stack.length) {
    const { x, y } = stack.shift() ?? { x: 0, y: 0 };
    getNextPipe(grid[x][y] as Pipes, x, y, gridHeight, gridWidth).forEach(({ newX, newY }) => {
      if (distances[newX][newY] === Infinity) {
        const newDistance = distances[x][y] + 1;
        distances[newX][newY] = newDistance;
        maxDistance = Math.max(maxDistance, newDistance);
        stack.push({ x: newX, y: newY });
      }
    });
  }
  return maxDistance;
}
const partOne = findMaxDistance();
console.log({ partOne });

function getRange(x: number, y: number) {
  const result: { partX: number; partY: number; destX: number; destY: number }[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      result.push({ partX: i, partY: j, destX: x * 3 + i, destY: y * 3 + j });
    }
  }
  return result;
}

// for part 2 blow up the grid turning each tile into 3 x 3 tiles
// then turn all tiles not in the main loop into ground tiles (removes unused pipe tiles)
// bfs to paint all ground tiles outside the main loop
// count left over ground tiles that are inside the loop
function createBigGrid() {
  const bigGrid: (string | number)[][] = [...Array(gridHeight * 3)].map(() => Array(gridWidth * 3).fill("."));
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      const tile = grid[x][y] as keyof typeof bigParts;
      const bigPart = bigParts[tile];
      getRange(x, y).forEach(({ destX, destY, partX, partY }) => {
        bigGrid[destX][destY] = bigPart[partX][partY];
      });
    }
  }

  return bigGrid;
}

// again use bfs on the loop but also turn all pipes not in the loop into ground tiles
function findLoop() {
  const bigGrid = createBigGrid();
  const start = findStart(bigGrid);

  const stack = [{ x: start.x, y: start.y }];
  const distances: (string | number)[][] = [...Array(gridHeight * 3)].map(() => Array(gridWidth * 3).fill("."));
  distances[start.x][start.y] = 0;

  while (stack.length) {
    const { x, y } = stack.shift() ?? { x: 0, y: 0 };
    getNextPipe(bigGrid[x][y] as Pipes, x, y, gridHeight * 3, gridWidth * 3).forEach(({ newX, newY }) => {
      if (distances[newX][newY] === ".") {
        distances[newX][newY] = Number(distances[x][y]) + 1;
        stack.push({ x: newX, y: newY });
      }
    });
  }
  return distances;
}

function findArea() {
  // new grid will only have the main loop and ground tiles
  const grid = findLoop();

  const stack = [{ x: 0, y: 0 }];
  grid[0][0] = 0;

  // find all ground tiles outside the loop
  while (stack.length) {
    const { x, y } = stack.shift() ?? { x: 0, y: 0 };
    getAdjacentCells(x, y, gridHeight * 3, gridWidth * 3).forEach(({ newX, newY }) => {
      if (grid[newX][newY] === ".") {
        const newDistance = Number(grid[x][y]) + 1;
        grid[newX][newY] = newDistance;
        stack.push({ x: newX, y: newY });
      }
    });
  }

  // count all unpainted ground tiles
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === ".") {
        let isGround = true;
        getAdjacentCells(i, j, gridHeight * 3, gridWidth * 3).forEach(({ newX, newY }) => {
          if (grid[newX][newY] !== ".") isGround = false;
        });
        if (isGround) {
          count += 1;
        }
      }
    }
  }

  return count / 9;
}
const partTwo = findArea();
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

