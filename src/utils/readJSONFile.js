const fs = require('fs');
const chalk = require('chalk');

const readJSONFile = filename => {
  let result;
  try {
    const rawData = fs.readFileSync(filename);
    result = JSON.parse(rawData);
  } catch (error) {
    console.error(chalk.redBright('File not found. Please make sure input file exists.'));
  }

  return result;
};

module.exports = readJSONFile;
