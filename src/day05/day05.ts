// Advent of Code day 5
// https://adventofcode.com/2023/day/5

import { rawInput } from "./rawInput";

const [rawSeeds, ...input] = rawInput.split("\n\n");
const seeds = rawSeeds.split(": ")[1].split(" ").map(Number);

const instructions = input.map((lines) => {
  const [, ...line] = lines.split("\n");
  return line.map((ranges) => ranges.split(" ").map(Number));
});

function partOneFindLowestLocation(seeds: number[]) {
  let lowestLocation = Infinity;
  seeds.forEach((seed) => {
    let source = seed;
    let destination = 0;
    instructions.forEach((map) => {
      for (let i = 0; i < map.length; i++) {
        const [destStart, sourceStart, rangeLength] = map[i];
        if (source >= sourceStart && source <= sourceStart + rangeLength) {
          const range = source - sourceStart;
          destination = destStart + range;
          break;
        }
      }
      if (!destination) {
        destination = source;
      }

      source = destination;
    });
    lowestLocation = Math.min(lowestLocation, destination);
  });
  return lowestLocation;
}

const partOne = partOneFindLowestLocation(seeds);
console.log({ partOne });

function getDestination(number: number, locationRange: number[][]) {
  for (let i = 0; i < locationRange.length; i++) {
    const [sourceStart, destStart, rangeLength] = locationRange[i];
    if (number >= sourceStart && number <= sourceStart + rangeLength) {
      return destStart + number - sourceStart;
    }
  }
  return number;
}

let maxSeed = 0;
for (let i = 0; i < seeds.length; i += 2) {
  const start = seeds[i];
  const length = seeds[i + 1];
  maxSeed = Math.max(maxSeed, start + length);
}

function reverseLowestLocation() {
  // to not kill the computer start at 60 million
  for (let location = 60000000; location <= maxSeed; location++) {
    let destination = location;

    for (let i = instructions.length - 1; i >= 0; i--) {
      const map = instructions[i];
      destination = getDestination(destination, map);
    }

    for (let j = 0; j < seeds.length; j += 2) {
      const start = seeds[j];
      const length = seeds[j + 1];
      if (destination >= start && destination <= start + length) {
        return location;
      }
    }
  }
  return null;
}

const partTwo = reverseLowestLocation();
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo?.toString() ?? ""));

