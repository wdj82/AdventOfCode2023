// Advent of Code day 19
// https://adventofcode.com/2023/day/19

import { rawInput } from "./rawInput";

const [rawWorkflows, rawRatings] = rawInput.split("\n\n");

type Test = { category: string; comparison: string; condition: number; destination: string };
const workflows: Record<string, { tests: Test[]; defaultDestination: string }> = {};
rawWorkflows.split("\n").forEach((lines) => {
  const firstBracket = lines.indexOf("{");
  const name = lines.slice(0, firstBracket);
  const tests = lines.slice(firstBracket + 1, lines.indexOf("}")).split(",");

  const finalTests: Test[] = [];
  for (let i = 0; i < tests.length - 1; i++) {
    const [test, destination] = tests[i].split(":");

    const category = test.slice(0, 1);
    const comparison = test.slice(1, 2);
    const condition = Number(test.slice(2));

    finalTests.push({ category, comparison, condition, destination });
  }
  workflows[name] = { tests: finalTests, defaultDestination: tests.at(-1) ?? "" };
});

const ratings = rawRatings.split("\n").map((lines) => {
  const object: Record<string, number> = {};
  const ratings = lines
    .slice(1, lines.length - 1)
    .split(",")
    .map((r) => r.split("="));

  ratings.forEach(([category, condition]) => {
    object[category] = Number(condition);
  });
  return object;
});

let partOne = 0;
ratings.forEach((rating) => {
  let currentWorkflow = "in";
  while (currentWorkflow !== "A" && currentWorkflow !== "R") {
    const { tests, defaultDestination } = workflows[currentWorkflow];

    let foundNew = false;
    for (let i = 0; i < tests.length; i++) {
      const { category, condition, comparison, destination } = tests[i];
      const value = rating[category];
      if ((comparison === ">" && value > condition) || (comparison === "<" && value < condition)) {
        currentWorkflow = destination;
        foundNew = true;
        break;
      }
    }
    if (!foundNew) {
      currentWorkflow = defaultDestination;
    }
  }
  if (currentWorkflow === "A") {
    partOne += rating["x"] + rating["m"] + rating["a"] + rating["s"];
  }
});

console.log({ partOne });

function newRange(comparison: string, condition: number, low: number, high: number) {
  if (comparison === ">") {
    low = Math.max(low, condition + 1);
  } else if (comparison === "<") {
    high = Math.min(high, condition - 1);
  } else if (comparison === ">=") {
    low = Math.max(low, condition);
  } else if (comparison === "<=") {
    high = Math.min(high, condition);
  } else {
    throw new Error("mistake");
  }
  return { low, high };
}
type XMASLowAndHigh = {
  xLow: number;
  xHigh: number;
  mLow: number;
  mHigh: number;
  aLow: number;
  aHigh: number;
  sLow: number;
  sHigh: number;
};
function newRanges(category: string, comparison: string, condition: number, lowsAndHighs: XMASLowAndHigh) {
  const { xLow, xHigh, mLow, mHigh, aLow, aHigh, sLow, sHigh } = lowsAndHighs;
  if (category === "x") {
    const range = newRange(comparison, condition, xLow, xHigh);
    return { ...lowsAndHighs, xLow: range.low, xHigh: range.high };
  }
  if (category === "m") {
    const range = newRange(comparison, condition, mLow, mHigh);
    return { ...lowsAndHighs, mLow: range.low, mHigh: range.high };
  }
  if (category === "a") {
    const range = newRange(comparison, condition, aLow, aHigh);
    return { ...lowsAndHighs, aLow: range.low, aHigh: range.high };
  }
  if (category === "s") {
    const range = newRange(comparison, condition, sLow, sHigh);
    return { ...lowsAndHighs, sLow: range.low, sHigh: range.high };
  }
  throw new Error("mistake");
}

let partTwo = 0;
const stack = [
  {
    state: "in",
    xLow: 1,
    xHigh: 4000,
    mLow: 1,
    mHigh: 4000,
    aLow: 1,
    aHigh: 4000,
    sLow: 1,
    sHigh: 4000,
  },
];
while (stack.length) {
  const currentState = stack.pop();
  if (!currentState) throw new Error("mistake");

  const { state } = currentState;
  let { xHigh, xLow, mHigh, mLow, aHigh, aLow, sHigh, sLow } = currentState;
  if (xLow > xHigh || mLow > mHigh || aLow > aHigh || sLow > sHigh) continue;

  if (state === "A") {
    partTwo += (xHigh - xLow + 1) * (mHigh - mLow + 1) * (aHigh - aLow + 1) * (sHigh - sLow + 1);
    continue;
  }

  if (state === "R") {
    continue;
  }

  const { tests, defaultDestination } = workflows[state];

  for (let i = 0; i < tests.length; i++) {
    const { category, condition, comparison, destination } = tests[i];
    stack.push({
      state: destination,
      ...newRanges(category, comparison, condition, { xHigh, xLow, mHigh, mLow, aHigh, aLow, sHigh, sLow }),
    });
    const ranges = newRanges(category, comparison === ">" ? "<=" : ">=", condition, {
      xHigh,
      xLow,
      mHigh,
      mLow,
      aHigh,
      aLow,
      sHigh,
      sLow,
    });
    xHigh = ranges.xHigh;
    xLow = ranges.xLow;
    mHigh = ranges.mHigh;
    mLow = ranges.mLow;
    aHigh = ranges.aHigh;
    aLow = ranges.aLow;
    sHigh = ranges.sHigh;
    sLow = ranges.sLow;
  }
  stack.push({ state: defaultDestination, xHigh, xLow, mHigh, mLow, aHigh, aLow, sHigh, sLow });
}

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

