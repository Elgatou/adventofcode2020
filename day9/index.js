import { XMAS } from './input.js';

const findCorruptNumber = (numbers, preamble) => {
  for (let i = preamble - 1; i < numbers.length; i++) {
    const number = numbers[i];
    let corrupted = true;

    for (let k = i - preamble; k < i; k++) {
      for (let n = k + 1; n < i; n++) {
        if (+numbers[n] + +numbers[k] === +number) corrupted = false;
      }
    }
    if (corrupted) return +number;
  }
};

const findSetSum = corruptNumber => {
  for (let startSetPosition = 0; startSetPosition < numbers.length; startSetPosition++) {
    const set = [];

    for (let i = startSetPosition; i < numbers.length; i++) {
      if (+numbers[i] >= corruptNumber) break;

      set.push(+numbers[i]);
      const setSum = set.reduce((x, y) => x + y);

      if (setSum === corruptNumber) {
        set.sort((a, b) => a - b);
        const setSum = set[0] + set[set.length - 1];
        return setSum;
      }
    }
  }
};

const numbers = XMAS.split('\n');
const corruptNumber = findCorruptNumber(numbers, 25);

console.log(corruptNumber, findSetSum(corruptNumber));
