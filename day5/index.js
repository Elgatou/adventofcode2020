// 1) As a sanity check, look through your list of boarding passes. What is the highest seat ID on a boarding pass?
// 2) Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list. What is the ID of your seat?

import { passes } from './input.js';

const passesArr = passes.split('\n');

const divide = (place, char) => {
  if (char === 'F' || char === 'L') {
    place[1] = place[1] - (place[1] - place[0]) / 2;
  } else {
    place[0] = place[0] + (place[1] - place[0]) / 2;
  }
};

const findIDs = passes => {
  let biggestId = 0;
  const IDs = [];

  passes.forEach(pass => {
    const rowSequence = pass.slice(0, 7);
    const columnSequence = pass.slice(7);

    let rowPlace = [0, 128];
    let columnPlace = [0, 8];

    [...rowSequence].forEach(char => divide(rowPlace, char));
    [...columnSequence].forEach(char => divide(columnPlace, char));

    const id = rowPlace[0] * 8 + columnPlace[0];
    biggestId = id > biggestId ? id : biggestId;
    IDs.push(id);
  });

  return [biggestId, IDs];
};

const findMyId = (biggestId, IDs) => {
  const seats = Array(biggestId).fill(false);
  IDs.forEach(id => (seats[id] = true));
  let myID;

  seats.forEach((seat, i) => {
    if (!seat) {
      if (seats[i - 1] && seats[i + 1]) myID = i;
    }
  });

  return myID;
};

const [biggestId, IDs] = findIDs(passesArr);
const myID = findMyId(biggestId, IDs);

console.log(biggestId, myID);
