const fs = require('fs');

const readJSONFile = filename => {
  const rawData = fs.readFileSync(filename);
  return JSON.parse(rawData);
};

module.exports = readJSONFile;
