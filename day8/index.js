// 1) Run your copy of the boot code. Immediately before any instruction is executed a second time, what value is in the accumulator?
// 2) Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?

import { code } from './input.js';

const instructions = code.split('\n');

const getAccumulatorFromFixedProgramm = (instructions, lineNumber) => {
  const changedInstructions = [...instructions];
  changedInstructions[lineNumber] = [...changedInstructions[lineNumber]];

  const changedInstruction = changedInstructions[lineNumber];

  if (changedInstruction[0] === 'acc') return 0;
  if (changedInstruction[0] === 'nop') changedInstruction[0] = 'jmp';
  if (changedInstruction[0] === 'jmp') changedInstruction[0] = 'nop';

  const [isFixed, accumulator] = isProgrammExecutable(changedInstructions);
  return isFixed ? accumulator : 0;
};

const isProgrammExecutable = instructions => {
  let repeats = [];
  let accumulator = 0;

  for (let i = 0; i < instructions.length; i++) {
    const [instruction, value] = instructions[i];

    if (instruction === 'acc') accumulator += +value;
    if (instruction === 'jmp') i += value - 1;

    if (repeats[i]) return [false, accumulator];
    else repeats[i] = true;
  }

  return [true, accumulator];
};

const normalizedInstructions = instructions.map(instruction => instruction.split(' '));

const accumulatorFromFixedProgramm = normalizedInstructions
  .map((instruction, line) => getAccumulatorFromFixedProgramm(normalizedInstructions, line))
  .reduce((x, y) => x + y);

console.log(isProgrammExecutable(normalizedInstructions), accumulatorFromFixedProgramm);
