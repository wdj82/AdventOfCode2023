// Advent of Code day 15
// https://adventofcode.com/2023/day/15

import { rawInput } from "./rawInput";

const sequence = rawInput.split(",");

function convertHash(hash: string) {
  let currentValue = 0;

  for (let i = 0; i < hash.length; i++) {
    const code = hash.charCodeAt(i);
    currentValue += code;
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}

const partOne = sequence.reduce((acc, value) => acc + convertHash(value), 0);

console.log({ partOne });

type Box = { label: string; lens: string };

const boxes = new Map<number, Box[]>();

function findLensIndex(targetLabel: string, savedBox: Box[]) {
  for (let i = 0; i < savedBox.length; i++) {
    const box = savedBox[i];
    if (box.label === targetLabel) return i;
  }
  return -1;
}

sequence.forEach((value) => {
  let label = "";
  let lens = "";
  let isRemove = false;
  if (value.includes("-")) {
    const split = value.split("-");
    label = split[0];
    isRemove = true;
  } else {
    const split = value.split("=");
    label = split[0];
    lens = split[1];
  }
  const boxNumber = convertHash(label);
  const savedBox = boxes.get(boxNumber) ?? [];
  const index = findLensIndex(label, savedBox);

  if (isRemove && index > -1) {
    savedBox.splice(index, 1);
    boxes.set(boxNumber, savedBox);
  } else if (!isRemove) {
    if (index > -1) {
      savedBox[index].lens = lens;
      boxes.set(boxNumber, savedBox);
    } else {
      const newBox = [...savedBox, { label, lens }];
      boxes.set(boxNumber, newBox);
    }
  }
});

let partTwo = 0;
boxes.forEach((contents, box) => {
  contents.forEach(({ lens }, index) => {
    partTwo += (box + 1) * (index + 1) * Number(lens);
  });
});

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
