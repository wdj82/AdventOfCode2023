// Advent of Code day 22
// https://adventofcode.com/2023/day/22

import { rawInput } from "./rawInput";

type Brick = {
  start: {
    x: number;
    y: number;
    z: number;
  };
  end: {
    x: number;
    y: number;
    z: number;
  };
};

const bricks = rawInput.split("\n").map((line) => {
  const [start, end] = line.split("~").map((coords) => coords.split(",").map(Number));
  return { start: { x: start[0], y: start[1], z: start[2] }, end: { x: end[0], y: end[1], z: end[2] } };
});

const occupation = new Map<string, Brick>();
bricks.forEach((brick) => {
  const { start, end } = brick;
  for (let x = start.x; x <= end.x; x++) {
    for (let y = start.y; y <= end.y; y++) {
      for (let z = start.z; z <= end.z; z++) {
        const key = `${x},${y},${z}`;
        if (!occupation.has(key)) {
          occupation.set(key, brick);
        }
      }
    }
  }
});

let step = true;
while (step) {
  step = false;
  bricks.forEach((brick) => {
    const { start, end } = brick;
    let fall = true;
    for (let x = start.x; x <= end.x; x++) {
      for (let y = start.y; y <= end.y; y++) {
        for (let z = start.z; z <= end.z; z++) {
          if (z - 1 <= 0) {
            fall = false;
          } else {
            const key = `${x},${y},${z - 1}`;
            if (occupation.has(key) && occupation.get(key) !== brick) {
              fall = false;
            }
          }
        }
      }
    }
    if (fall) {
      step = true;
      for (let x = start.x; x <= end.x; x++) {
        for (let y = start.y; y <= end.y; y++) {
          for (let z = start.z; z <= end.z; z++) {
            const key = `${x},${y},${z}`;
            occupation.delete(key);
          }
        }
      }
      brick.start.z -= 1;
      brick.end.z -= 1;
      for (let x = start.x; x <= end.x; x++) {
        for (let y = start.y; y <= end.y; y++) {
          for (let z = start.z; z <= end.z; z++) {
            const key = `${x},${y},${z}`;
            occupation.set(key, brick);
          }
        }
      }
    }
  });
}

const above = new Map<Brick, Set<Brick>>();
const below = new Map<Brick, Set<Brick>>();
bricks.forEach((brick) => {
  above.set(brick, new Set());
  below.set(brick, new Set());
});

bricks.forEach((brick) => {
  for (let x = brick.start.x; x <= brick.end.x; x++) {
    for (let y = brick.start.y; y <= brick.end.y; y++) {
      for (let z = brick.start.z; z <= brick.end.z; z++) {
        const key = `${x},${y},${z + 1}`;
        if (occupation.has(key)) {
          const other = occupation.get(key);
          if (!other) throw new Error("oops");
          if (other != brick) {
            above.get(brick)?.add(other);
            below.get(other)?.add(brick);
          }
        }
      }
    }
  }
});

let partOne = 0;
bricks.forEach((brick) => {
  let safe = true;
  above.get(brick)?.forEach((brickAbove) => {
    if (below.get(brickAbove)?.size == 1) {
      safe = false;
    }
  });

  if (safe) {
    partOne++;
  }
});

console.log({ partOne });

let partTwo = 0;
bricks.forEach((brick) => {
  const gone = new Set<Brick>();
  gone.add(brick);

  let foundNewOne = true;
  while (foundNewOne) {
    foundNewOne = false;
    gone.forEach((goneBrick) => {
      above.get(goneBrick)?.forEach((aboveBrick) => {
        const belowBrick = below.get(aboveBrick);
        if (!belowBrick) throw new Error("oops");

        const isAllBelowGone = [...belowBrick].every((x) => gone.has(x));

        if (!gone.has(aboveBrick) && isAllBelowGone) {
          gone.add(aboveBrick);
          foundNewOne = true;
        }
      });
    });
  }

  partTwo += gone.size - 1;
});

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

