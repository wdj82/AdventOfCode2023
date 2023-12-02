// Advent of Code day 2
// https://adventofcode.com/2023/day/2

import { rawInput } from "./rawInput";

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const games = rawInput.split("\n").map((line) =>
  line
    .split(": ")[1]
    .split("; ")
    .map((turn) => turn.split(", ").flatMap((cubes) => cubes.split(" ")))
);

console.log({ games });

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

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode("partTwo"));

