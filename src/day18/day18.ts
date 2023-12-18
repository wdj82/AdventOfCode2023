// Advent of Code day 18
// https://adventofcode.com/2023/day/18

import { rawInput } from "./rawInput";

const instructions = rawInput
  .split("\n")
  .map((lines) => lines.split(" ").map((line) => line.replace("(", "").replace(")", "")));

const instructions2 = instructions.map(([, , color]) => {
  const directionCode = color[6];
  let direction = "";
  if (directionCode === "0") direction = "R";
  if (directionCode === "1") direction = "D";
  if (directionCode === "2") direction = "L";
  if (directionCode === "3") direction = "U";

  // convert hex
  const length = parseInt(color.slice(1, 6), 16).toString();

  return [direction, length];
});

const change = {
  R: { dx: 1, dy: 0 },
  L: { dx: -1, dy: 0 },
  U: { dx: 0, dy: -1 },
  D: { dx: 0, dy: 1 },
};

function findArea(instructions: string[][]) {
  let perimeter = 0;
  let area = 0;
  let x = 0;
  let y = 0;
  const points = [{ x: 0, y: 0 }];

  // save the points of the polygon and calculate the perimeter
  instructions.forEach(([direction, length]) => {
    const distance = Number(length);
    const { dx, dy } = change[direction as keyof typeof change];
    x += dx * distance;
    y += dy * distance;
    points.push({ x, y });
    perimeter += distance;
  });

  // shoelace formula
  for (let i = 0; i < points.length; i++) {
    const nextIndex = (i + 1) % points.length;
    const { x: currentX, y: currentY } = points[i];
    const { x: nextX, y: nextY } = points[nextIndex];
    area += currentX * nextY - currentY * nextX;
  }

  area = Math.abs(area) / 2;
  // math crap to include the missing 1/2 square wide border around the outside
  return area + (perimeter / 2 + 1);
}

const partOne = findArea(instructions);
console.log({ partOne });
const partTwo = findArea(instructions2);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

