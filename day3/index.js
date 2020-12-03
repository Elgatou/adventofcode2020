// 1)Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
// 2)What do you get if you multiply together the number of trees encountered on each of the listed slopes?
/*
Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
*/

import { map } from './input.js';

const mapArr = map.split('\n');

const countTreesOnSlope = (xSpeed, ySpeed) => {
  let treeCouner = 0;

  for (let i = 0, x = 0; i < mapArr.length; i += ySpeed, x += xSpeed) {
    const position = x < mapArr[0].length ? x : x % mapArr[0].length;
    const row = mapArr[i];
    if (row[position] === '#') treeCouner++;
  }

  return treeCouner;
};

const countTreesOnSlopesArray = arr =>
  arr.map(directs => countTreesOnSlope(...directs)).reduce((x, y) => x * y);

console.log(
  countTreesOnSlope(3, 1),
  countTreesOnSlopesArray([
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ])
);
