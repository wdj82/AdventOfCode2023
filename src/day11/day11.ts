// Advent of Code day 11
// https://adventofcode.com/2023/day/11

import { rawInput } from "./rawInput";

const grid = rawInput.split("\n").map((lines) => lines.split(""));

type Point = { x: number; y: number };

const coords: Point[] = [];

const emptyColumns: number[] = [];
const emptyRows: number[] = [];

// save the coords of each galaxy in the grid
// also record the empty rows and columns
for (let x = 0; x < grid.length; x++) {
  let isRowEmpty = true;
  let isColumnEmpty = true;
  for (let y = 0; y < grid.length; y++) {
    const cell1 = grid[x][y];
    if (cell1 === "#") {
      isRowEmpty = false;
      coords.push({ x, y });
    }
    const cell2 = grid[y][x];
    if (cell2 === "#") {
      isColumnEmpty = false;
    }
  }
  if (isRowEmpty) {
    emptyRows.push(x);
  }
  if (isColumnEmpty) {
    emptyColumns.push(x);
  }
}

function manDist(coord1: Point, coord2: Point, extraSpace: number) {
  // see how many of the empty rows and columns are passed through between the two galaxies
  let extraRows = 0;
  for (let x = Math.min(coord1.x, coord2.x) + 1; x < Math.max(coord1.x, coord2.x); x++) {
    if (emptyRows.includes(x)) {
      extraRows += extraSpace;
    }
  }
  let extraColumns = 0;
  for (let y = Math.min(coord1.y, coord2.y) + 1; y < Math.max(coord1.y, coord2.y); y++) {
    if (emptyColumns.includes(y)) {
      extraColumns += extraSpace;
    }
  }
  // add the extra space for the empty columns and rows between the galaxies
  return Math.abs(coord2.x - coord1.x) + Math.abs(coord2.y - coord1.y) + extraRows + extraColumns;
}

function calculateDistances(extraSpace: number) {
  let sum = 0;
  for (let i = 0; i < coords.length; i++) {
    const galaxy = coords[i];
    for (let j = i + 1; j < coords.length; j++) {
      const galaxy2 = coords[j];
      const dist = manDist(galaxy, galaxy2, extraSpace);
      sum += dist;
    }
  }
  return sum;
}

const partOne = calculateDistances(1);
console.log({ partOne });

const partTwo = calculateDistances(1000000 - 1);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

