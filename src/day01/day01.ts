// Advent of Code day 1
// https://adventofcode.com/2023/day/1

import { rawInput } from "./rawInput";
// import { testInput } from "./rawInput";

const stringNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

// const lines = testInput.split("\n");
const lines = rawInput.split("\n");

const partOne = lines
  .map((line) => {
    let number = "";
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (!isNaN(Number(char))) {
        number += char;
        break;
      }
    }
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line[i];
      if (!isNaN(Number(char))) {
        number += char;
        break;
      }
    }
    return Number(number);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ partOne });

const partTwo = lines
  .map((line) => {
    let number = "";

    let firstNumberIndex = Infinity;
    let lastNumberIndex = -Infinity;
    let firstStringIndex = Infinity;
    let lastStringIndex = -Infinity;
    let firstStringNumber = -1;
    let lastStringNumber = -1;

    // find first and last string indexes and save what those numbers are
    stringNumbers.forEach((stringNumber, number) => {
      const firstIndex = line.indexOf(stringNumber);
      const lastIndex = line.lastIndexOf(stringNumber);
      if (firstIndex > -1 && firstIndex < firstStringIndex) {
        firstStringIndex = firstIndex;
        firstStringNumber = number + 1;
      }
      if (lastIndex > -1 && lastIndex > lastStringIndex) {
        lastStringIndex = lastIndex;
        lastStringNumber = number + 1;
      }
    });

    // find first number index
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (!isNaN(Number(char))) {
        firstNumberIndex = i;
        break;
      }
    }

    // find last number index
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line[i];
      if (!isNaN(Number(char))) {
        lastNumberIndex = i;
        break;
      }
    }

    if (firstNumberIndex < firstStringIndex) {
      number += line[firstNumberIndex];
    } else {
      number += firstStringNumber;
    }

    if (lastNumberIndex > lastStringIndex) {
      number += line[lastNumberIndex];
    } else {
      number += lastStringNumber;
    }

    return Number(number);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

