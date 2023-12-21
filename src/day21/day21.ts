// Advent of Code day 21
// https://adventofcode.com/2023/day/21

import { getAdjacentCellsCardinal } from "../utils/getAdjacentCells";
import { rawInput } from "./rawInput";

const grid = rawInput.split("\n").map((lines) => lines.split(""));
const gridHeight = grid.length;
const gridWidth = grid[0].length;
console.log({ grid });

function findStart() {
  for (let x = 0; x < gridHeight; x++) {
    for (let y = 0; y < gridWidth; y++) {
      if (grid[x][y] === "S") {
        return { x, y };
      }
    }
  }
  throw new Error("no start");
}

function findMaxDistance() {
  const start = findStart();

  let count = 1;
  const maxWalk = 64;
  const stack = [{ x: start.x, y: start.y }];
  const distances: number[][] = [...Array(gridHeight)].map(() => Array(gridWidth).fill(-1));
  distances[start.x][start.y] = 0;

  while (stack.length) {
    const { x, y } = stack.shift() ?? { x: 0, y: 0 };
    getAdjacentCellsCardinal(x, y, gridHeight, gridWidth).forEach(({ newX, newY }) => {
      if (distances[newX][newY] === -1 && grid[newX][newY] !== "#") {
        const newDistance = distances[x][y] + 1;
        if (newDistance > maxWalk) return;
        if (newDistance % 2 === 0) {
          count += 1;
        }
        distances[newX][newY] = newDistance;
        stack.push({ x: newX, y: newY });
      }
    });
  }

  return count;
}

const partOne = findMaxDistance();
console.log({ partOne });

const mod = (n: number, m: number) => ((n % m) + m) % m;

let pos: Record<string, number[]> = {};

const DS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const key = (x: number, y: number) => x + "_" + y;

const map = rawInput.split("\n").map((line, y) =>
  line.split("").map((v, x) => {
    if (v == "S") {
      pos[key(x, y)] = [x, y, 1];
      return ".";
    }
    return v;
  })
);

const diffs = (row: number[]) => row.map((v, i) => v - row[i - 1]).slice(1);
const run = (arr: number[][]) =>
  arr.map((step) => {
    while (step.some((v) => v !== 0)) {
      step = diffs(step);
      arr.push(step);
    }
    return arr.map((v) => v[0]);
  });

const len = map.length;

const step = (pos: Record<string, number[]>) => {
  const newPos: Record<string, number[]> = {};
  Object.values(pos).forEach(([x, y, v]) => {
    DS.forEach(([dx, dy]) => {
      if (map[mod(y + dy, len)][mod(x + dx, len)] == ".") newPos[key(x + dx, y + dy)] = [x + dx, y + dy];
    });
  });
  return newPos;
};

const vals = [];

for (let i = 1; i <= 131 * 2 + 65; i++) {
  pos = step(pos);

  // if (i == 64) console.log("p1", Object.keys(pos).length);

  if (i % 131 == 65) {
    vals.push(Object.keys(pos).length);
    console.log(i, (i - 65) / 131, Object.keys(pos).length);
  }
}

const ks = run([vals])[0];

console.log("polynom coeficients", ks);

const steps = (26501365 - 65) / 131; // 202300, map.length = 131
const partTwo = ks[0] + ks[1] * steps + (steps * (steps - 1) * ks[2]) / 2;
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

