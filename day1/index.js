import { numbers } from './data.js';

let arr = numbers.split('\n').map(n => parseInt(n, 10));

const findTwo = () => {
  for (let i = 0; i < arr.length; i++) {
    for (let n = i + 1; n < arr.length; n++) {
      if (arr[i] + arr[n] === 2020) return arr[i] * arr[n];
    }
  }
};

const findThree = () => {
  for (let i = 0; i < arr.length; i++) {
    for (let n = i + 1; n < arr.length; n++) {
      for (let k = n + 1; k < arr.length; k++) {
        if (arr[i] + arr[n] + arr[k] === 2020) return arr[i] * arr[n] * arr[k];
      }
    }
  }
};

console.log(findTwo(), findThree());
