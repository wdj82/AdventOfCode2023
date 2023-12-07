// Advent of Code day 7
// https://adventofcode.com/2023/day/7

import { rawInput } from "./rawInput";

// const testInput2 = `2345A 1
// Q2KJJ 13
// Q2Q2Q 19
// T3T3J 17
// T3Q33 11
// 2345J 3
// J345A 2
// 32T3K 5
// T55J5 29
// KK677 7
// KTJJT 34
// QQQJA 31
// JJJJJ 37
// JAAAA 43
// AAAAJ 59
// AAAAA 61
// 2AAAA 23
// 2JJJJ 53
// JJJJ2 41`;

// Part 1: 6592
// Part 2: 6839

// const testInput = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`;

const hands = rawInput.split("\n").map((lines) => {
  return lines.split(" ");
});

const Cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const JokerCards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

// five of a kind = 6
// four of a kind = 5
// full house = 4
// three of a kind = 3
// two pairs = 2
// one pair = 1
// high card = 0

const savedCards = new Map<string, number>();

function parseCards(hand: string, partTwo = false) {
  if (savedCards.has(hand)) {
    return savedCards.get(hand);
  }

  let jokers = 0;

  const cardMap = new Map<string, number>();
  for (let i = 0; i < hand.length; i++) {
    const char = hand[i];
    if (partTwo && char === "J") {
      jokers += 1;
      continue;
    }
    const oldCount = cardMap.get(char) ?? 0;
    cardMap.set(char, oldCount + 1);
  }

  let cards = [...cardMap.values()].sort((a, b) => b - a);
  // check for all jokers
  if (typeof cards[0] === "number") {
    cards[0] += jokers;
  } else {
    cards = [jokers];
  }

  // default of high card
  let type = 0;

  // five of a kind
  if (cards[0] === 5) {
    type = 6;
  }
  // four of a kind
  if (cards[0] === 4) {
    type = 5;
  }
  if (cards[0] === 3) {
    if (cards[1] === 2) {
      // full house
      type = 4;
    } else {
      // three of a kind
      type = 3;
    }
  }
  if (cards[0] === 2) {
    if (cards[1] === 2) {
      // two pair
      type = 2;
    } else {
      // one pair
      type = 1;
    }
  }

  savedCards.set(hand, type);
  return type;
}

function checkEqualHands(hand1: string, hand2: string, partTwo = false) {
  for (let i = 0; i < hand1.length; i++) {
    const card1 = hand1[i];
    const card2 = hand2[i];
    if (card1 === card2) continue;

    if (partTwo) {
      if (JokerCards.indexOf(card1) < JokerCards.indexOf(card2)) {
        // console.log(`${hand1} > ${hand2}`);
        return -1;
      }
      // console.log(`${hand2} > ${hand1}`);
      return 1;
    }
    if (Cards.indexOf(card1) < Cards.indexOf(card2)) {
      // console.log(`${hand1} > ${hand2}`);
      return -1;
    }
    // console.log(`${hand2} > ${hand1}`);
    return 1;
  }
  return 0;
}

// function getType(type: number) {
//   if (type === 0) return "High Card";
//   if (type === 1) return "One Pair";
//   if (type === 2) return "Two Pair";
//   if (type === 3) return "Three Pair";
//   if (type === 4) return "Full House";
//   if (type === 5) return "Four of a Kind";
//   if (type === 6) return "FIVE of a Kind";
// }

hands.sort((nextHand, currHand) => {
  const hand1 = currHand[0];
  const hand2 = nextHand[0];
  const cards1 = parseCards(hand1);
  const cards2 = parseCards(hand2);
  if (cards1 === undefined || cards2 === undefined) throw new Error("problem");
  if (cards1 === cards2) {
    return checkEqualHands(hand1, hand2);
  }
  if (cards1 > cards2) {
    // console.log(`${hand1}, ${getType(cards1.type)} > ${hand2}, ${getType(cards2.type)}`);
    return -1;
  }
  // console.log(`${hand2}, ${getType(cards2.type)} > ${hand1}, ${getType(cards1.type)}`);
  return 1;
});

const partOne = hands.reduce((acc, curr, index) => {
  const bid = Number(curr[1]);
  return acc + bid * (index + 1);
}, 0);

console.log({ partOne });

// clear hash for part two
savedCards.clear();

hands.sort((nextHand, currHand) => {
  const hand1 = currHand[0];
  const hand2 = nextHand[0];
  const cards1 = parseCards(hand1, true);
  const cards2 = parseCards(hand2, true);
  if (cards1 === undefined || cards2 === undefined) throw new Error("problem");

  if (cards1 === cards2) {
    return checkEqualHands(hand1, hand2, true);
  }
  if (cards1 > cards2) {
    // console.log(`${hand1}, ${getType(cards1)} > ${hand2}, ${getType(cards2)}`);
    return -1;
  }
  // console.log(`${hand2}, ${getType(cards2)} > ${hand1}, ${getType(cards1)}`);
  return 1;
});

const partTwo = hands.reduce((acc, curr, index) => {
  const bid = Number(curr[1]);
  return acc + bid * (index + 1);
}, 0);

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
