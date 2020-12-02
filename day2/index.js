//How many passwords are valid according to their policies?
import { passwords } from './input.js';

let arr = passwords.split('\n').map(pass => {
  const [interval, letter, password] = pass.split(' ');
  const [min, max] = interval.split('-').map(n => parseInt(n, 10));
  return { min, max, letter: letter[0], password };
});

const validate1 = () => {
  let validPasswordsCounter = 0;

  arr.forEach(element => {
    let letterCounter = 0;
    [...element.password].forEach(char => char === element.letter && letterCounter++);
    if (element.min <= letterCounter && letterCounter <= element.max) validPasswordsCounter++;
  });

  return validPasswordsCounter;
};

const validate2 = () => {
  let validPasswordsCounter = 0;

  arr.forEach(element => {
    let isValid = false;
    if (element.password[element.min - 1] === element.letter) isValid = !isValid;
    if (element.password[element.max - 1] === element.letter) isValid = !isValid;
    if (isValid) validPasswordsCounter++;
  });

  return validPasswordsCounter;
};

console.log(validate1(), validate2());
