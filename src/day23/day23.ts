// Advent of Code day 23
// https://adventofcode.com/2023/day/23

import { rawInput } from "./rawInput";

const input = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;

const grid = rawInput.split("\n").map((lines) => lines.split(""));

const DS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const D = { ">": 0, v: 1, "<": 2, "^": 3 };

const startPos = [1, 0];
const endPos = [grid[0].length - 2, grid.length - 1];

const key = (p: number[]) => p[0] + "_" + p[1];
const addVect = (a: number[], b: number[]) => a.map((v, c) => v + b[c]);
const validPos = (p: number[]) =>
  grid[p[1]] !== undefined && grid[p[1]][p[0]] !== undefined && grid[p[1]][p[0]] !== "#";

type Position = {
  p: number[];
  steps: number;
  lastJuncId: number;
  stepsToLastJunc: number;
};

type Node = {
  p: number[];
  connections: { id: number; distance: number }[];
};

const getGraph = () => {
  const addConnectNode = (cur: Position) => {
    // try to locate existing one
    let newJuncId = nodes.findIndex((n) => n.p[0] == cur.p[0] && n.p[1] == cur.p[1]);

    if (newJuncId == cur.lastJuncId) return newJuncId;

    if (newJuncId == -1) newJuncId = nodes.push({ p: cur.p.slice(), connections: [] }) - 1;

    // we need to connect cur.lastJuncId and newJuncId
    if (nodes[cur.lastJuncId].connections.findIndex((conn) => conn.id == newJuncId) == -1)
      nodes[cur.lastJuncId].connections.push({
        id: newJuncId,
        distance: cur.steps - cur.stepsToLastJunc,
      });

    if (nodes[newJuncId].connections.findIndex((conn) => conn.id == cur.lastJuncId) == -1)
      nodes[newJuncId].connections.push({
        id: cur.lastJuncId,
        distance: cur.steps - cur.stepsToLastJunc,
      });

    return newJuncId;
  };

  const stack = [{ p: startPos.slice(), steps: 0, lastJuncId: 0, stepsToLastJunc: 0 }];
  const nodes: Node[] = [{ p: [1, 0], connections: [] }];
  const seen: Record<string, number> = {};

  while (stack.length) {
    const cur = stack.pop();
    if (!cur) throw new Error("oops");
    const k = key(cur.p);
    const moves = DS.map((d) => addVect(cur.p, d)).filter(validPos);

    if (moves.length > 2) {
      cur.lastJuncId = addConnectNode(cur);
      cur.stepsToLastJunc = cur.steps;
    }

    if (seen[k] !== undefined) continue;
    seen[k] = 1;

    if (cur.p[0] == endPos[0] && cur.p[1] == endPos[1]) {
      addConnectNode(cur);
      continue;
    }

    moves.forEach((np) =>
      stack.push({
        p: np,
        steps: cur.steps + 1,
        lastJuncId: cur.lastJuncId,
        stepsToLastJunc: cur.stepsToLastJunc,
      })
    );
  }

  return nodes;
};

const part2 = () => {
  const nodes = getGraph();

  const stack: { p: number; steps: number; seen: Record<string, number> }[] = [{ p: 0, steps: 0, seen: {} }];
  const endNodeId = nodes.length - 1;
  let maxSteps = 0;

  while (stack.length) {
    const cur = stack.pop();
    if (!cur) throw new Error("oops2");

    const k = cur.p;
    cur.seen[k] = 1;

    if (cur.p == endNodeId) {
      maxSteps = Math.max(cur.steps, maxSteps);
      continue;
    }

    nodes[k].connections
      .filter((n) => cur.seen[n.id] === undefined)
      .forEach((n) =>
        stack.push({
          p: n.id,
          steps: cur.steps + n.distance,
          seen: { ...cur.seen },
        })
      );
  }

  return maxSteps;
};

type Stack1 = {
  p: number[];
  steps: number;
  seen: Record<string, number>;
};

const part1 = () => {
  const getMoves = (cur: Stack1) => {
    const moves = [],
      v = grid[cur.p[1]][cur.p[0]];

    if (D[v as keyof typeof D] !== undefined) moves.push(addVect(cur.p, DS[D[v as keyof typeof D]]));
    else DS.forEach((d) => moves.push(addVect(cur.p, d)));

    return moves.filter((p) => validPos(p) && cur.seen[key(p)] === undefined);
  };

  const stack: Stack1[] = [{ p: startPos.slice(), steps: 0, seen: {} }];
  let maxSteps = 0;

  while (stack.length) {
    const cur = stack.pop();
    if (!cur) throw new Error("oops3");

    const k = key(cur.p);
    cur.seen[k] = 1;

    let moves = getMoves(cur);
    while (moves.length == 1) {
      cur.seen[key(moves[0])] = 1;
      cur.steps++;
      cur.p = moves[0];
      moves = getMoves(cur);
    }

    if (cur.p[0] == endPos[0] && cur.p[1] == endPos[1]) {
      maxSteps = Math.max(maxSteps, cur.steps);
      continue;
    }

    moves.forEach((np) =>
      stack.push({
        p: np,
        steps: cur.steps + 1,
        seen: { ...cur.seen },
      })
    );
  }

  return maxSteps;
};

console.log("p1", part1());

console.log("p2", part2());

document.getElementById("partOne")?.appendChild(document.createTextNode("partOne"));
document.getElementById("partTwo")?.appendChild(document.createTextNode("partTwo"));

