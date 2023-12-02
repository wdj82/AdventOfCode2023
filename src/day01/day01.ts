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

function findFirstStringNumberIndex(line: string) {
  for (let i = 0; i < line.length; i++) {
    const threeChar = line.slice(i, i + 3);
    if (threeChar === "one") {
      return { index: i, number: "1" };
    }
    if (threeChar === "two") {
      return { index: i, number: "2" };
    }
    if (threeChar === "six") {
      return { index: i, number: "6" };
    }
    const fourChar = line.slice(i, i + 4);
    if (fourChar === "four") {
      return { index: i, number: "4" };
    }
    if (fourChar === "five") {
      return { index: i, number: "5" };
    }
    if (fourChar === "nine") {
      return { index: i, number: "9" };
    }
    const fiveChar = line.slice(i, i + 5);
    if (fiveChar === "three") {
      return { index: i, number: "3" };
    }
    if (fiveChar === "seven") {
      return { index: i, number: "7" };
    }
    if (fiveChar === "eight") {
      return { index: i, number: "8" };
    }
  }
  return null;
}

function findLastStringNumberIndex(line: string) {
  for (let i = line.length - 1; i >= 0; i--) {
    const threeChar = line.slice(i - 2, i + 1);
    if (threeChar === "one") {
      return { index: i - 2, number: "1" };
    }
    if (threeChar === "two") {
      return { index: i - 2, number: "2" };
    }
    if (threeChar === "six") {
      return { index: i - 2, number: "6" };
    }
    const fourChar = line.slice(i - 3, i + 1);
    if (fourChar === "four") {
      return { index: i - 3, number: "4" };
    }
    if (fourChar === "five") {
      return { index: i - 3, number: "5" };
    }
    if (fourChar === "nine") {
      return { index: i - 3, number: "9" };
    }
    const fiveChar = line.slice(i - 4, i + 1);
    if (fiveChar === "three") {
      return { index: i - 4, number: "3" };
    }
    if (fiveChar === "seven") {
      return { index: i - 4, number: "7" };
    }
    if (fiveChar === "eight") {
      return { index: i - 4, number: "8" };
    }
  }
  return null;
}

const partTwo = lines
  .map((line) => {
    let number = "";

    const firstStringNumber = findFirstStringNumberIndex(line);
    const lastStringNumber = findLastStringNumberIndex(line);

    let firstNumberIndex = Infinity;
    let lastNumberIndex = -Infinity;
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

    if (firstStringNumber && firstStringNumber?.index < firstNumberIndex) {
      number += firstStringNumber?.number;
    } else {
      number += line[firstNumberIndex];
    }

    if (lastStringNumber && lastStringNumber?.index > lastNumberIndex) {
      number += lastStringNumber?.number;
    } else {
      number += line[lastNumberIndex];
    }

    return Number(number);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

