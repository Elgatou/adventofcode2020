import { docs } from './input.js';

const arr = docs.split('\n\n');

const validateDocs = (docArray, options = { withValueValidation: false }) => {
  let validCounter = 0;
  const schema = {
    byr: val => 1920 <= Number(val) && Number(val) <= 2002,
    iyr: val => 2010 <= Number(val) && Number(val) <= 2020,
    eyr: val => 2020 <= Number(val) && Number(val) <= 2030,
    ecl: val => val.match(/\bamb|blu|brn|gry|grn|hzl|oth\b/),
    pid: val => val.match(/\b\d{9}\b/),
    hcl: val => val.match(/#[0-9a-f]{6}/),
    cid: val => true,
    hgt: val => {
      const type = val.slice(-2);
      if (type === 'cm') {
        const value = Number(val.slice(0, 3));
        return 150 <= value && value <= 193;
      }
      if (type === 'in') {
        const value = Number(val.slice(0, 2));
        return 59 <= value && value <= 76;
      }
      return false;
    },
  };

  docArray.forEach(doc => {
    const validFields = {
      byr: false,
      iyr: false,
      eyr: false,
      hgt: false,
      hcl: false,
      ecl: false,
      pid: false,
    };
    const docFields = doc.split(/\n|\s/).map(field => field.split(':'));

    docFields.forEach(docField => {
      const [fieldName, fieldValue] = docField;
      if (options.withValueValidation) {
        validFields[fieldName] = schema[fieldName](fieldValue);
      } else {
        validFields[fieldName] = true;
      }
    });

    for (const name in validFields) {
      if (!validFields[name]) return;
    }
    validCounter++;
  });

  return validCounter;
};

console.log(validateDocs(arr), validateDocs(arr, { withValueValidation: true }));
