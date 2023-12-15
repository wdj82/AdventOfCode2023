// Advent of Code day 6
// https://adventofcode.com/2023/day/6

import { inputPartOne, inputPartTwo } from "./input";

function findWinningRaces([duration, distance]: number[]) {
  let winningRaces = 0;

  for (let heldTime = 1; heldTime < duration; heldTime++) {
    const raceTime = duration - heldTime;
    const raceDistance = heldTime * raceTime;
    if (raceDistance > distance) {
      winningRaces += 1;
    }
  }
  return winningRaces;
}

let partOne = 1;
inputPartOne.forEach((race) => {
  const winningRaces = findWinningRaces(race);
  partOne *= winningRaces;
});
console.log({ partOne });

const partTwo = findWinningRaces(inputPartTwo);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
