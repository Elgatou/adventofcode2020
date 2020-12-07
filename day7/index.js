import { bagRules } from './input.js';

const normalize = bags => {
  const normalizedBags = {};

  bags.forEach(rule => {
    const getBagName = ruleArr => {
      const [part1, part2] = ruleArr[0].split(' ');
      return `${part1} ${part2}`;
    };

    const getBagValue = bag => {
      const nameArr = bag.split(' ');
      const bagValue = `${nameArr[2]} ${nameArr[3]}`;
      const bagCount = +nameArr[1];
      return [bagValue, bagCount];
    };

    const containedBags = rule.split(/contain|,/);
    const bagName = getBagName(containedBags);

    if (containedBags[1] === ' no other bags.') {
      normalizedBags[bagName] = [];
    } else {
      const normalizedBagValues = containedBags.filter((e, i) => i).map(bag => getBagValue(bag));
      normalizedBags[bagName] = normalizedBagValues;
    }
  });

  return normalizedBags;
};

const getBagsContainsBagType = (bags, bagType) => {
  const findGoldBag = bag => {
    const recursivelyFind = names => {
      names.forEach(([name]) => {
        if (name === bagType) {
          isFinded = true;
          return;
        } else recursivelyFind(bags[name]);
      });
    };

    let isFinded = false;
    recursivelyFind(bag);
    return isFinded;
  };

  let bagsContainBagType = 0;

  for (const bagName in bags) {
    const goldBagIsFinded = findGoldBag(bags[bagName]);
    if (goldBagIsFinded) bagsContainBagType++;
  }

  return bagsContainBagType;
};

const countAllbagInside = (bags, bagType) => {
  const recursivelyCount = bagArray => {
    if (!bagArray.length) return 1;
    return bagArray
      .map(([bagname, bagCount]) => bagCount * recursivelyCount(bags[bagname]))
      .reduce((x, y) => x + y, 1);
  };

  return recursivelyCount(bags[bagType]) - 1;
};

const bagRulesArr = bagRules.split('\n');
const normalizedBags = normalize(bagRulesArr);

const NumberOfBagsContainsGoldBag = getBagsContainsBagType(normalizedBags, 'shiny gold');
const bagsInsideGoldBag = countAllbagInside(normalizedBags, 'shiny gold');

console.log(NumberOfBagsContainsGoldBag, bagsInsideGoldBag);
