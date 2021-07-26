export const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const sum = (x, y) => x + y;
export const transformSeat = (symb) => {
  if (symb === '.') return null;
  return symb === 'L' ? 0 : 1;
};

export const drawArr = (array) => {
  console.log('\n');
  const visualizeSymb = (symb) => {
    if (symb === null) return '.';
    return symb ? '#' : 'L';
  };

  const drawedArr = array.map((arr) => arr.map(visualizeSymb).join('')).join('\n');
  console.log(drawedArr);
};

//PART 1 Neighbors
export const calculateNeighbors = (x, y, seats) => {
  const neighbors = [];
  for (let i = x - 1; i < x + 2; i++) {
    for (let k = y - 1; k < y + 2; k++) {
      if (i === x && k === y) continue;
      neighbors.push(seats[i] && seats[i][k]);
    }
  }

  return neighbors.map((e) => (e === undefined ? 0 : e)).reduce(sum);
};

//PART 2 Neighbors
export const calculateVisibleNeighbors = (x, y, seats) => {
  const neighbors = directions.map(([vectorX, vectorY]) => {
    for (let xCord = x + vectorX, yCord = y + vectorY; ; xCord += vectorX, yCord += vectorY) {
      const seat = seats[xCord] && seats[xCord][yCord];
      if (seat === undefined) return 0;
      if (seat === 1) return 1;
      if (seat === 0) return 0;
    }
  });

  return neighbors.reduce(sum);
};

export const calculateNextState = (currentState, neighborsNumber, mode) => {
  let maxNeighborsNumber;

  if (mode === 'default') maxNeighborsNumber = 3;
  if (mode === 'visible') maxNeighborsNumber = 4;

  if (currentState) {
    if (neighborsNumber > maxNeighborsNumber) return 0;
    else return 1;
  } else {
    if (neighborsNumber === 0) return 1;
    else return 0;
  }
};
