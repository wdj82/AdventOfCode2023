// Advent of Code day 20
// https://adventofcode.com/2023/day/20

import { lcm } from "../utils/lcm";
import { rawInput } from "./rawInput";

type Module =
  | {
      type: "flipflop";
    }
  | {
      type: "conjunction";
      inputs: Map<string, boolean>;
    }
  | {
      type: "broadcast";
    };

const links: Record<string, string[]> = {};
const types = new Map<string, Module>();

rawInput.split("\n").forEach((line) => {
  const [source, dest] = line.split(" -> ");
  const destList = dest.split(", ");
  if (source.startsWith("%")) {
    const name = source.slice(1);
    links[name] = destList;
    types.set(name, { type: "flipflop" });
  } else if (source.startsWith("&")) {
    const name = source.slice(1);
    links[name] = destList;
    types.set(name, { type: "conjunction", inputs: new Map() });
  } else if (source === "broadcaster") {
    links[source] = destList;
    types.set(source, { type: "broadcast" });
  }
});

Object.entries(links).forEach(([source, destList]) => {
  destList.forEach((dest) => {
    const destModule = types.get(dest);
    if (!destModule) return;
    if (destModule.type === "conjunction" && !destModule.inputs.has(source)) {
      destModule.inputs.set(source, false);
    }
  });
});

let partOne = 0;
let low = 0;
let high = 0;
const onNodes = new Set();

const watch = ["hn", "kt", "ph", "vn"];
const count = { hn: 0, kt: 0, ph: 0, vn: 0 };

for (let i = 1; i <= 100000; i++) {
  const queue = [{ dest: "broadcaster", source: "button", signal: "low" }];

  while (queue.length) {
    const next = queue.shift();
    if (!next) break;
    const { dest, source, signal } = next;

    // for part 2
    if (watch.includes(dest) && signal === "low") {
      count[dest as keyof typeof count] = i;
    }

    if (signal === "low") {
      low += 1;
    } else {
      high += 1;
    }

    const module = types.get(dest);
    if (!module) continue;

    if (module.type === "broadcast") {
      links[dest].forEach((link) => {
        queue.push({ dest: link, source: dest, signal });
      });
    } else if (module.type === "flipflop") {
      if (signal === "high") {
        continue;
      }
      let newSignal = "";
      if (onNodes.has(dest)) {
        onNodes.delete(dest);
        newSignal = "low";
      } else {
        onNodes.add(dest);
        newSignal = "high";
      }
      links[dest].forEach((link) => {
        queue.push({ dest: link, source: dest, signal: newSignal });
      });
    } else if (module.type === "conjunction") {
      module.inputs.set(source, signal === "high");
      let newSignal = "low";
      module.inputs.forEach((input) => {
        if (!input) newSignal = "high";
      });
      links[dest].forEach((link) => {
        queue.push({ dest: link, source: dest, signal: newSignal });
      });
    }
  }

  if (i === 1000) {
    partOne = low * high;
  }
  if (Object.values(count).every((value) => value !== 0)) {
    break;
  }
}

const partTwo = lcm(Object.values(count));
console.log({ partOne });
console.log({ partTwo });
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

