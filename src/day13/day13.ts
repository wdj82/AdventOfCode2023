// Advent of Code day 13
// https://adventofcode.com/2023/day/13

import { rawInput } from "./rawInput";

const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const patterns = rawInput.split("\n\n").map((pattern) => pattern.split("\n").map((line) => line.split("")));

console.log({ patterns });

function print(pattern: string[][]) {
  for (let i = 0; i < pattern.length; i++) {
    console.log([...pattern[i]]);
  }
  console.log("---------------------------------------------");
}

function isRowMirrored(row: number, pattern: string[][]) {
  // console.log({ row });
  let prev = row - 1;
  let next = row + 2;
  while (prev >= 0 && next < pattern.length) {
    // console.log(pattern[prev], pattern[next]);
    for (let col = 0; col < pattern[0].length; col++) {
      if (pattern[prev][col] !== pattern[next][col]) {
        return false;
      }
    }
    prev -= 1;
    next += 1;
  }
  return true;
}

function isColumnMirrored(column: number, pattern: string[][]) {
  // console.log({ column });
  let prev = column - 1;
  let next = column + 2;
  while (prev >= 0 && next < pattern[0].length) {
    // console.log(prev, next);
    for (let row = 0; row < pattern.length; row++) {
      // console.log(pattern[row][prev], pattern[row][next]);
      if (pattern[row][prev] !== pattern[row][next]) {
        return false;
      }
    }
    prev -= 1;
    next += 1;
  }
  return true;
}

function findMirroredRow(pattern: string[][]) {
  for (let x = 0; x < pattern.length - 1; x++) {
    const row = pattern[x];
    const nextRow = pattern[x + 1];
    let mirrored = true;
    for (let y = 0; y < pattern[0].length; y++) {
      if (row[y] !== nextRow[y]) {
        mirrored = false;
        break;
      }
    }
    if (mirrored && isRowMirrored(x, pattern)) {
      return x;
    }
  }
  return -1;
}

function findMirroredColumn(pattern: string[][]) {
  for (let y = 0; y < pattern[0].length - 1; y++) {
    let mirrored = true;
    for (let x = 0; x < pattern.length; x++) {
      if (pattern[x][y] !== pattern[x][y + 1]) {
        mirrored = false;
        break;
      }
    }
    if (mirrored && isColumnMirrored(y, pattern)) {
      return y;
    }
  }
  return -1;
}

const partOneAnswers = new Map<number, { row?: number; column?: number }>();

const partOne = patterns.reduce((acc, pattern, index) => {
  const column = findMirroredColumn(pattern);
  // console.log({ column });
  if (column !== -1) {
    partOneAnswers.set(index, { column });
    return acc + column + 1;
  }
  const row = findMirroredRow(pattern);
  // console.log({ row });
  if (row !== -1) {
    partOneAnswers.set(index, { row });
    return acc + 100 * (row + 1);
  }
  return acc;
}, 0);

console.log({ partOne });
console.log("*************************************");
console.log("*************************************");
console.log("*************************************");
console.log({ partOneAnswers });
const partTwo = patterns.reduce((acc, pattern, index) => {
  // const index = 1;
  // const pattern = patterns[index];
  for (let x = 0; x < pattern.length; x++) {
    for (let y = 0; y < pattern[0].length; y++) {
      const tile = pattern[x][y];
      pattern[x][y] = tile === "#" ? "." : "#";
      // console.log({ x, y, pattern, tile });
      const previousAnswer = partOneAnswers.get(index);
      const column = findMirroredColumn(pattern);

      if (column !== -1) {
        if (previousAnswer?.column !== column) {
          console.log({ row: previousAnswer?.row, column: previousAnswer?.column });
          print(pattern);
          console.log({ column });
          return acc + column + 1;
        }
      }
      const row = findMirroredRow(pattern);
      if (row !== -1) {
        if (previousAnswer?.row !== row) {
          console.log({ row: previousAnswer?.row, column: previousAnswer?.column });
          print(pattern);
          console.log({ row });
          return acc + 100 * (row + 1);
        }
      }
      pattern[x][y] = tile;
    }
  }
  return acc;
}, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode("partOne"));
document.getElementById("partTwo")?.appendChild(document.createTextNode("partTwo"));
