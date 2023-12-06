// Advent of Code day 1
// https://adventofcode.com/2023/day/1

import { rawInput } from "./rawInput";

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

function findFirstNumber(line: string) {
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!isNaN(Number(char))) {
      return char;
    }

    const threeChar = line.slice(i, i + 3);
    if (threeChar === "one") {
      return "1";
    }
    if (threeChar === "two") {
      return "2";
    }
    if (threeChar === "six") {
      return "6";
    }
    const fourChar = line.slice(i, i + 4);
    if (fourChar === "four") {
      return "4";
    }
    if (fourChar === "five") {
      return "5";
    }
    if (fourChar === "nine") {
      return "9";
    }
    const fiveChar = line.slice(i, i + 5);
    if (fiveChar === "three") {
      return "3";
    }
    if (fiveChar === "seven") {
      return "7";
    }
    if (fiveChar === "eight") {
      return "8";
    }
  }
  throw new Error("no number");
}

function findLastNumber(line: string) {
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line[i];
    if (!isNaN(Number(char))) {
      return char;
    }

    const threeChar = line.slice(i - 2, i + 1);
    if (threeChar === "one") {
      return "1";
    }
    if (threeChar === "two") {
      return "2";
    }
    if (threeChar === "six") {
      return "6";
    }
    const fourChar = line.slice(i - 3, i + 1);
    if (fourChar === "four") {
      return "4";
    }
    if (fourChar === "five") {
      return "5";
    }
    if (fourChar === "nine") {
      return "9";
    }
    const fiveChar = line.slice(i - 4, i + 1);
    if (fiveChar === "three") {
      return "3";
    }
    if (fiveChar === "seven") {
      return "7";
    }
    if (fiveChar === "eight") {
      return "8";
    }
  }
  throw new Error("no number");
}

const partTwo = lines
  .map((line) => {
    const firstStringNumber = findFirstNumber(line);
    const lastStringNumber = findLastNumber(line);

    return Number(firstStringNumber + lastStringNumber);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
