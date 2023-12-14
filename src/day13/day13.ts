// Advent of Code day 13
// https://adventofcode.com/2023/day/13

import { rawInput } from "./rawInput";

const patterns = rawInput.split("\n\n").map((pattern) => pattern.split("\n").map((line) => line.split("")));

function isMirroredRow(pattern: string[][]) {
  for (let row = 0; row < pattern.length - 1; row++) {
    let isValid = true;
    let left = row;
    let right = row + 1;
    while (left >= 0 && right < pattern.length) {
      const leftRow = pattern[left].join("");
      const rightRow = pattern[right].join("");
      if (leftRow !== rightRow) {
        isValid = false;
        break;
      }
      left -= 1;
      right += 1;
    }
    if (isValid) {
      return (row + 1) * 100;
    }
  }
  return -1;
}

function isMirroredColumn(pattern: string[][]) {
  for (let col = 0; col < pattern[0].length - 1; col++) {
    let isValid = true;
    let left = col;
    let right = col + 1;
    while (left >= 0 && right < pattern[0].length) {
      const leftCol = pattern.map((row) => row[left]).join("");
      const rightCol = pattern.map((row) => row[right]).join("");
      if (leftCol !== rightCol) {
        isValid = false;
        break;
      }
      left -= 1;
      right += 1;
    }
    if (isValid) {
      return col + 1;
    }
  }
  return -1;
}

const partOne = patterns.reduce((acc, pattern) => {
  const column = isMirroredColumn(pattern);
  if (column !== -1) {
    return acc + column;
  }
  const row = isMirroredRow(pattern);
  return acc + row;
}, 0);

console.log({ partOne });

function getDifference(left: string[], right: string[]) {
  let diff = 0;
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      diff += 1;
    }
  }
  return diff;
}

function findHorizontalReflection(pattern: string[][]) {
  for (let col = 0; col < pattern[0].length - 1; col++) {
    let mismatch = 0;
    let left = col;
    let right = col + 1;
    while (left >= 0 && right < pattern[0].length) {
      const leftCol = pattern.map((row) => row[left]);
      const rightCol = pattern.map((row) => row[right]);
      mismatch += getDifference(leftCol, rightCol);
      if (mismatch > 1) {
        break;
      }
      left -= 1;
      right += 1;
    }
    if (mismatch === 1) {
      return col + 1;
    }
  }
  return -1;
}

function findVerticalReflection(pattern: string[][]) {
  for (let row = 0; row < pattern.length - 1; row++) {
    let mismatch = 0;
    let left = row;
    let right = row + 1;
    while (left >= 0 && right < pattern.length) {
      const leftRow = pattern[left];
      const rightRow = pattern[right];
      mismatch += getDifference(leftRow, rightRow);
      if (mismatch > 1) {
        break;
      }
      left -= 1;
      right += 1;
    }
    if (mismatch === 1) {
      return (row + 1) * 100;
    }
  }
  return -1;
}

const partTwo = patterns.reduce((acc, pattern) => {
  const horizontal = findHorizontalReflection(pattern);
  if (horizontal !== -1) {
    return (acc += horizontal);
  }
  const vertical = findVerticalReflection(pattern);
  return (acc += vertical);
}, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

