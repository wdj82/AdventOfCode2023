// Advent of Code day 16
// https://adventofcode.com/2023/day/16

import { rawInput } from "./rawInput";

const grid = rawInput.split("\n").map((lines) => lines.split(""));

type Direction = "N" | "S" | "E" | "W";

type Beam = { x: number; y: number; direction: Direction };

function moveBeam(beam: Beam) {
  if (beam.direction === "N") {
    beam.x -= 1;
    return;
  }
  if (beam.direction === "S") {
    beam.x += 1;
    return;
  }
  if (beam.direction === "W") {
    beam.y -= 1;
    return;
  }
  if (beam.direction === "E") {
    beam.y += 1;
    return;
  }
}

function handleBeam(beams: Beam[], savedBeams: Set<string>, visited: Set<string>) {
  const beam = beams[0];

  if (beam.x < 0 || beam.x >= grid.length || beam.y < 0 || beam.y >= grid[0].length) {
    // beam has hit the wall remove
    beams.shift();
    return;
  }

  const id = `${beam.x},${beam.y},${beam.direction}`;
  if (savedBeams.has(id)) {
    // beam is in a loop remove
    beams.shift();
    return;
  }
  savedBeams.add(id);
  visited.add(`${beam.x},${beam.y}`);

  const symbol = grid[beam.x][beam.y];
  if (symbol === ".") {
    moveBeam(beam);
    return;
  }

  if (symbol === "-") {
    if (beam.direction === "E" || beam.direction === "W") {
      moveBeam(beam);
      return;
    }
    beams.push({ direction: "E", x: beam.x, y: beam.y + 1 });
    beams.push({ direction: "W", x: beam.x, y: beam.y - 1 });
    beams.shift();
    return;
  }

  if (symbol === "|") {
    if (beam.direction === "N" || beam.direction === "S") {
      moveBeam(beam);
      return;
    }
    beams.push({ direction: "N", x: beam.x - 1, y: beam.y });
    beams.push({ direction: "S", x: beam.x + 1, y: beam.y });
    beams.shift();
    return;
  }

  if (symbol === "L") {
    if (beam.direction === "N") {
      beam.direction = "W";
      moveBeam(beam);
      return;
    }
    if (beam.direction === "S") {
      beam.direction = "E";
      moveBeam(beam);
      return;
    }
    if (beam.direction === "E") {
      beam.direction = "S";
      moveBeam(beam);
      return;
    }
    if (beam.direction === "W") {
      beam.direction = "N";
      moveBeam(beam);
      return;
    }
  }

  if (symbol === "/") {
    if (beam.direction === "N") {
      beam.direction = "E";
      moveBeam(beam);
      return;
    }
    if (beam.direction === "S") {
      beam.direction = "W";
      moveBeam(beam);
      return;
    }
    if (beam.direction === "E") {
      beam.direction = "N";
      moveBeam(beam);
      return;
    }
    if (beam.direction === "W") {
      beam.direction = "S";
      moveBeam(beam);
      return;
    }
  }
}

function solvePartOne(x: number, y: number, direction: Direction) {
  const savedBeams = new Set<string>();
  const visited = new Set<string>();
  const beams: Beam[] = [{ x, y, direction }];

  while (beams.length) {
    handleBeam(beams, savedBeams, visited);
  }
  return visited.size;
}
const partOne = solvePartOne(0, 0, "E");
console.log({ partOne });

function solvePartTwo() {
  const result: number[] = [];

  for (let x = 0; x < grid.length; x++) {
    result.push(solvePartOne(x, 0, "E"));
    result.push(solvePartOne(x, grid[0].length - 1, "W"));
  }

  for (let y = 0; y < grid[0].length; y++) {
    result.push(solvePartOne(0, y, "S"));
    result.push(solvePartOne(grid.length - 1, y, "N"));
  }

  return Math.max(...result);
}
const partTwo = solvePartTwo();
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

