// Advent of Code day 8
// https://adventofcode.com/2023/day/8

import { rawInput } from "./rawInput";

const [instructions, rawNodes] = rawInput.split("\n\n");

const nodeMap: Record<string, { L: string; R: string }> = {};
const startingNodes: string[] = [];

rawNodes.split("\n").forEach((line) => {
  const [label, nodes] = line.split(" = ");
  const [L, R] = nodes.replace("(", "").replace(")", "").split(", ");
  nodeMap[label] = { L, R };

  // for part two
  if (label.endsWith("A")) {
    startingNodes.push(label);
  }
});

function calculatePartOne() {
  let currentNode = "AAA";
  let i = 0;
  let count = 0;
  while (currentNode !== "ZZZ") {
    const instruction = instructions[i] as "R" | "L";
    currentNode = nodeMap[currentNode][instruction];

    i = i === instructions.length - 1 ? 0 : i + 1;
    count += 1;
  }

  return count;
}

const partOne = calculatePartOne();
console.log({ partOne });

function lcm(steps: number[]) {
  const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
  const _lcm = (a: number, b: number) => (a * b) / gcd(a, b);
  return steps.reduce((a, b) => _lcm(a, b));
}

// for part two find how many steps for each starting node to their end node then the lcm of all the steps
const steps = startingNodes.map((node) => {
  let i = 0;
  let count = 0;
  while (!node.endsWith("Z")) {
    const instruction = instructions[i] as "R" | "L";
    node = nodeMap[node][instruction];

    i = i === instructions.length - 1 ? 0 : i + 1;
    count += 1;
  }

  return count;
});

const partTwo = lcm(steps);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
