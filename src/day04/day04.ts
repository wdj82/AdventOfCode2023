// Advent of Code day 4
// https://adventofcode.com/2023/day/4

import { rawInput } from "./rawInput";

// const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

function parseNumbers(numbers: string) {
  const parsedWinningNumbers: number[] = [];
  for (let i = 0; i < numbers.length; i += 3) {
    const number = `${numbers[i]}${numbers[i + 1]}`.trim();
    parsedWinningNumbers.push(Number(number));
  }
  return parsedWinningNumbers;
}

const numbers = rawInput.split("\n").map((lines) => {
  return lines
    .split(": ")[1]
    .split(" | ")
    .map((numbers) => parseNumbers(numbers));
});

const partOne = numbers.reduce((acc, [winningNumbers, pickedNumbers]) => {
  const points = winningNumbers.reduce(
    (acc, curr) => {
      if (pickedNumbers.includes(curr)) {
        acc.correctCount += 1;
        if (acc.correctCount === 1) {
          acc.points = 1;
          return acc;
        }
        acc.points *= 2;
        return acc;
      }
      return acc;
    },
    { points: 0, correctCount: 0 }
  );

  return acc + points.points;
}, 0);

let partTwo = 0;
const cardWins: Map<number, number> = new Map();
const numberOfCards: Map<number, number> = new Map();

// save the wins for each card and set initial card count
numbers.forEach(([winningNumbers, pickedNumbers], index) => {
  const matchingNumbers = winningNumbers.reduce((acc, curr) => {
    if (pickedNumbers.includes(curr)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  cardWins.set(index, matchingNumbers);
  numberOfCards.set(index, 1);
});

numberOfCards.forEach((count, currentCard) => {
  partTwo += count;
  const wins = cardWins.get(currentCard);
  if (!wins) return;

  // for each copy of the current card add copies of the next cards for each win
  // e.g. there are 2 copies of card #1 and card #1 has 4 wins
  // Add cards 2, 3, 4, 5 (the next 4 cards because of the 4 wins) for each card #1 (twice)
  // we now have 3 copies of cards 2, 3, 4, 5 (the original cards plus the new ones)
  // then continue with card 2
  for (let i = currentCard + 1; i < currentCard + 1 + wins; i++) {
    const oldCount = numberOfCards.get(i) ?? 0;
    numberOfCards.set(i, oldCount + 1 * count);
  }
});

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
