import { ansverGroups } from './input.js';

const countAnyoneAnswer = groupArr => {
  let groupAnsvers = {};

  groupArr.forEach(ansver => {
    [...ansver].forEach(letter => (groupAnsvers[letter] = true));
  });

  return Object.keys(groupAnsvers).length;
};

const countEveryoneAnswer = groupArr => {
  let groupAnsvers;

  groupArr.forEach((ansver, i) => {
    const personAnswers = {};
    [...ansver].forEach(letter => (personAnswers[letter] = true));

    if (i === 0) groupAnsvers = personAnswers;
    else {
      for (const letter in groupAnsvers) {
        if (!personAnswers[letter]) {
          delete groupAnsvers[letter];
        }
      }
    }
  });

  return Object.keys(groupAnsvers).length;
};

const groupsArr = ansverGroups.split('\n\n');

const countsAnyone = groupsArr.map(group => countAnyoneAnswer(group.split('\n')));
const countsEveryone = groupsArr.map(group => countEveryoneAnswer(group.split('\n')));

const sumAnyone = countsAnyone.reduce((x, y) => x + y);
const sumEveryone = countsEveryone.reduce((x, y) => x + y);

console.log(sumAnyone, sumEveryone);
