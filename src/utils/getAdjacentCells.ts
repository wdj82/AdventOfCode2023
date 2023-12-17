// use for traversing the grid
const searchDirections = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

// return in bound adjacent coordinates
export function getAdjacentCells(currX: number, currY: number, height: number, width: number) {
  const result = [];

  for (let i = 0; i < searchDirections.length; i++) {
    const newX = searchDirections[i].x + currX;
    const newY = searchDirections[i].y + currY;
    if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
      result.push({ newX, newY });
    }
  }
  return result;
}
