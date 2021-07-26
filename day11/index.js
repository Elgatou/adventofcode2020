import { seatsMap } from './input.js';
import {
  calculateVisibleNeighbors,
  calculateNeighbors,
  calculateNextState,
  transformSeat,
  sum,
  drawArr,
} from './utils.js';

let InitialSeats = seatsMap.split('\n').map((row) => row.split('').map(transformSeat));

const runSimulation = (mode) => {
  let seats = [...InitialSeats];
  let isChanged = false;

  do {
    isChanged = false;
    const nextSeats = [];

    for (let i = 0; i < seats.length; i++) {
      const row = [];
      for (let k = 0; k < seats[i].length; k++) {
        const currentSeatState = seats[i][k];
        if (currentSeatState === null) {
          row.push(null);
          continue;
        }

        let neighborsNumber;
        if (mode === 'default') neighborsNumber = calculateNeighbors(i, k, seats);
        if (mode === 'visible') neighborsNumber = calculateVisibleNeighbors(i, k, seats);

        const nextState = calculateNextState(currentSeatState, neighborsNumber, mode);

        if (nextState !== currentSeatState) isChanged = true;
        row.push(nextState);
      }
      nextSeats.push(row);
    }
    seats = nextSeats;
  } while (isChanged);

  return seats;
};

const countSeats = (seatsArr) => {
  return seatsArr.map((arr) => arr.reduce(sum)).reduce(sum);
};

const answer1 = countSeats(runSimulation('default'));
const answer2 = countSeats(runSimulation('visible'));

console.log(answer1, answer2);
