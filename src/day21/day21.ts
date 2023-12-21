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

// const partTwo = solvePartTwo();
// console.log({ partTwo });

// p2 idea: since the whole row and line S is on is dots, it must be approximated by quadratic
// p2 observation: fully filled-out (sub) map will just oscilate between 2 states
// p2 observation: weird step number! 26501365 = 202300 * map.length + map.length/2
// reached(steps) grows quadraticly, with len = map.length we need to find reached(offset + i * len), offset is 65 in our case, i is integer
// we need to get to first 3 i's, then figure out the polynomial
// reached(steps) in my case as a fnc of i: i=0: 3703, i=1: 32957, i=2: 91379
// originally plugged this into https://www.dcode.fr/newton-interpolating-polynomial :shrug:
// wolfram alpha is also a good friend here: https://www.wolframalpha.com/input?i=quadratic+fit+calculator&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3x%22%7D+-%3E%22%7B0%2C+1%2C+2%7D%22&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3y%22%7D+-%3E%22%7B3703%2C+32957%2C+91379%7D%22
// later figured out we can use day9 and made the solution return actual result

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

