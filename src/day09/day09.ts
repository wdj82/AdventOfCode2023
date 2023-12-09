// Advent of Code day 9
// https://adventofcode.com/2023/day/9

import { rawInput } from "./rawInput";

const lines = rawInput.split("\n").map((lines) => lines.split(" ").map(Number));

function generateDifferences(numbers: number[]) {
  const differences: number[] = [];
  let isAllZeroes = true;
  for (let i = 0; i < numbers.length - 1; i++) {
    const first = numbers[i];
    const second = numbers[i + 1];
    const difference = second - first;
    differences.push(difference);
    if (difference !== 0) {
      isAllZeroes = false;
    }
  }
  return { differences, isAllZeroes };
}

function findSequence(numbers: number[], findPrev = false): number {
  const { differences, isAllZeroes } = generateDifferences(numbers);
  if (isAllZeroes) {
    if (findPrev) {
      return numbers.at(0) ?? 0;
    }
    return numbers.at(-1) ?? 0;
  }
  const nextNumber = findSequence(differences, findPrev);
  if (findPrev) {
    return (numbers.at(0) ?? 0) - nextNumber;
  }
  return (numbers.at(-1) ?? 0) + nextNumber;
}

const partOne = lines.reduce((acc, line) => acc + findSequence(line), 0);
console.log({ partOne });

const partTwo = lines.reduce((acc, line) => acc + findSequence(line, true), 0);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

