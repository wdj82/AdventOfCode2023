// Advent of Code day 6
// https://adventofcode.com/2023/day/6

const inputPartOne = [
  [54, 446],
  [81, 1292],
  [70, 1035],
  [88, 1007],
];
const inputPartTwo = [54817088, 446129210351007];

// const inputPartOne = [
//   [7, 9],
//   [15, 40],
//   [30, 200],
// ];

// const inputPartTwo = [71530, 940200];

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
