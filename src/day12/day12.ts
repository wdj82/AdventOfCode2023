// Advent of Code day 12
// https://adventofcode.com/2023/day/12

import { rawInput } from "./rawInput";

type Row = { springs: string; answers: number[] };
const springRows: Row[] = [];

rawInput.split("\n").forEach((lines) => {
  const row: Row = { springs: "", answers: [] };
  lines.split(" ").map((line, index) => {
    if (index === 1) {
      row.answers = line.split(",").map(Number);
    } else {
      row.springs = line;
    }
  });
  springRows.push(row);
});

console.log({ springRows });

const memoized = new Map<string, number>();

function calculate(springs: string, answers: number[]): number {
  const key = `${springs.slice(1)},${answers.join(",")}`;
  if (memoized.has(key)) {
    return memoized.get(key) ?? 0;
  }

  if (springs === "" && answers.length === 0) {
    // correct answer
    memoized.set(key, 1);
    return 1;
  }
  if (springs === "" && answers.length > 0) {
    // incorrect answer
    memoized.set(key, 0);
    return 0;
  }

  if (springs[0] === ".") {
    const key = `${springs.slice(1)},${answers.join(",")}`;
    if (memoized.has(key)) {
      return memoized.get(key) ?? 0;
    }
    const result = calculate(springs.slice(1), answers);
    memoized.set(key, result);
    return result;
  }

  if (springs[0] === "?") {
    const replace = springs.split("");
    replace[0] = "#";
    const branch1 = replace.join("");
    const branch2 = springs.slice(1);
    let result1: number;
    let result2: number;
    const key1 = `${branch1},${answers.join(",")}`;
    const key2 = `${branch2},${answers.join(",")}`;
    if (memoized.has(key1)) {
      result1 = memoized.get(key1) ?? 0;
    } else {
      result1 = calculate(branch1, answers);
      memoized.set(key1, result1);
    }
    if (memoized.has(key2)) {
      result2 = memoized.get(key2) ?? 0;
    } else {
      result2 = calculate(branch2, answers);
      memoized.set(key2, result2);
    }

    return result1 + result2;
  }

  let group = "";
  let index = -1;
  for (let i = 0; i < springs.length; i++) {
    const char = springs[i];
    if (char === ".") {
      break;
    }
    if (char === "?") {
      index = i;
      break;
    }
    group += char;
  }
  if (index > -1) {
    const replace = springs.split("");
    replace[index] = "#";
    const branch1 = replace.join("");
    replace[index] = ".";
    const branch2 = replace.join("");
    let result1: number;
    let result2: number;
    const key1 = `${branch1},${answers.join(",")}`;
    const key2 = `${branch2},${answers.join(",")}`;
    if (memoized.has(key1)) {
      result1 = memoized.get(key1) ?? 0;
    } else {
      result1 = calculate(branch1, answers);
      memoized.set(key1, result1);
    }
    if (memoized.has(key2)) {
      result2 = memoized.get(key2) ?? 0;
    } else {
      result2 = calculate(branch2, answers);
      memoized.set(key2, result1);
    }

    return result1 + result2;
  }

  if (group.length === answers[0]) {
    const replace = springs.slice(group.length);
    const newAnswers = answers.slice(1);
    const key = `${replace},${newAnswers.join(",")}`;
    let result: number;
    if (memoized.has(key)) {
      result = memoized.get(key) ?? 0;
    } else {
      result = calculate(replace, newAnswers);
      memoized.set(key, result);
    }
    return result;
  }
  return 0;
}

const partOne = springRows.reduce((acc, { springs, answers }) => {
  memoized.clear();
  return acc + calculate(springs, answers);
}, 0);

console.log({ partOne });

const partTwo = springRows.reduce((acc, { springs, answers }) => {
  memoized.clear();
  let foldedSprings = "";
  let foldedAnswers: number[] = [];
  for (let i = 0; i < 5; i++) {
    foldedSprings += springs;
    if (i !== 4) {
      foldedSprings += "?";
    }
    foldedAnswers = [...foldedAnswers, ...answers];
  }
  return acc + calculate(foldedSprings, foldedAnswers);
}, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

