import { adapters } from './input.js';

const sortedAdapters = adapters
  .split('\n')
  .sort((x, y) => x - y)
  .map(n => parseInt(n, 10));

sortedAdapters.push(sortedAdapters[sortedAdapters.length - 1] + 3);
sortedAdapters.unshift(0);

const differences = { 1: 0, 2: 0, 3: 0 };

sortedAdapters.forEach((currentAdapter, i) => {
  const diff = sortedAdapters[i + 1] - currentAdapter;
  differences[diff]++;
});

//part 2

const graph = sortedAdapters.map((adapter, i) => {
  const edges = [];

  const diff1 = sortedAdapters[i - 1];
  const diff2 = sortedAdapters[i - 2];
  const diff3 = sortedAdapters[i - 3];

  if (adapter - diff1 < 4) edges.push(1);
  if (adapter - diff2 < 4) edges.push(2);
  if (adapter - diff3 < 4) edges.push(3);

  return {
    edges,
    paths: 1
  };
});


const countGraph = () => {
  graph.forEach( (elem, i) => {
    const edges = elem.edges;
    if (!edges.length) return;

    let newPaths = 0;
    edges.forEach( edge => {
      newPaths += graph[i-edge].paths;
    });

    elem.paths = newPaths;
  })
};

countGraph();

const answer1 = differences[1] * differences[3];
const answer2 = graph[graph.length-1].paths

console.log( answer1, answer2);
