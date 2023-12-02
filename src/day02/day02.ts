// Advent of Code day 2
// https://adventofcode.com/2023/day/2

import { rawInput } from "./rawInput";

const games = rawInput.split("\n").map((line) =>
  line
    .split(": ")[1]
    .split("; ")
    .map((turn) => turn.split(", ").flatMap((cubes) => cubes.split(" ")))
);

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const partOne = games.reduce((acc, game, index) => {
  for (let turnNum = 0; turnNum < game.length; turnNum++) {
    const cubes = game[turnNum];
    let redCount = 0;
    let greenCount = 0;
    let blueCount = 0;

    for (let i = 0; i < cubes.length; i += 2) {
      const count = Number(cubes[i]);
      const color = cubes[i + 1];
      if (color === "red") {
        redCount = count;
      } else if (color === "green") {
        greenCount = count;
      } else {
        blueCount = count;
      }
    }

    if (redCount > maxRed || greenCount > maxGreen || blueCount > maxBlue) {
      return acc;
    }
  }

  return acc + index + 1;
}, 0);

console.log({ partOne });

const partTwo = games.reduce((acc, game) => {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;

  for (let turnNum = 0; turnNum < game.length; turnNum++) {
    const cubes = game[turnNum];

    for (let i = 0; i < cubes.length; i += 2) {
      const count = Number(cubes[i]);
      const color = cubes[i + 1];
      if (color === "red") {
        maxRed = Math.max(maxRed, count);
      } else if (color === "green") {
        maxGreen = Math.max(maxGreen, count);
      } else {
        maxBlue = Math.max(maxBlue, count);
      }
    }
  }

  return acc + maxRed * maxBlue * maxGreen;
}, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

