// Advent of Code day 3
// https://adventofcode.com/2023/day/3

import { rawInput } from "./rawInput";

// const testInput = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

const grid = rawInput.split("\n").map((line) => line.split(""));

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
function getAdjacentCells(currX: number, currY: number, gridSize: number) {
  const result = [];

  for (let i = 0; i < searchDirections.length; i++) {
    const newX = searchDirections[i].x + currX;
    const newY = searchDirections[i].y + currY;
    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
      result.push({ newX, newY });
    }
  }
  return result;
}

const gears = new Map<string, number[]>();

// check the adjacent cells for a valid symbol around each digit of the potential part number
function isValidPartNumber(x: number, numberColumns: number[], partNumber: number) {
  for (let i = 0; i < numberColumns.length; i++) {
    const col = numberColumns[i];
    const adjacentCells = getAdjacentCells(x, col, grid.length);
    for (let j = 0; j < adjacentCells.length; j++) {
      const { newX, newY } = adjacentCells[j];
      const adjacent = grid[newX][newY];

      if (adjacent === "*") {
        // for part two save this adjacent number next to a gear
        const coordinates = `${newX},${newY}`;
        const partNumbers = gears.get(coordinates) ?? [];
        gears.set(coordinates, [...partNumbers, partNumber]);
        return true;
      }

      // not next to a gear. check for other symbols for part one
      if (adjacent !== "." && isNaN(Number(adjacent))) {
        return true;
      }
    }
  }

  // number is not next to any valid symbols - not a valid part number
  return false;
}

let partOne = 0;

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid.length; y++) {
    const cell = grid[x][y];
    if (!isNaN(Number(cell))) {
      // have a digit get the complete part number
      const numberColumns: number[] = [];
      let partNumber = "";
      let newY = y;

      while (!isNaN(Number(grid[x][newY])) && y < grid.length) {
        partNumber += grid[x][newY];
        numberColumns.push(newY);
        newY += 1;
      }
      // skip to after the complete part number in this row
      y = newY;

      if (isValidPartNumber(x, numberColumns, Number(partNumber))) {
        partOne += Number(partNumber);
      }
    }
  }
}

let partTwo = 0;
gears.forEach((adjacentParts) => {
  if (adjacentParts.length === 2) {
    partTwo += adjacentParts[0] * adjacentParts[1];
  }
});

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode("partTwo"));

