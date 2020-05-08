const chalk = require('chalk');
const readJSONFile = require('./utils/readJSONFile');
const ApiaryConfigService = require('./services/ApiaryConfigService');
const OperationService = require('./services/Operations/OperationService');

require('dotenv').config();

const filename = process.argv[2];
const transactions = readJSONFile(filename);

const processTransactions = async () => {
  const apiaryConfigService = new ApiaryConfigService();
  await apiaryConfigService.initialize();
  const { config } = apiaryConfigService;

  if (config) {
    const operationService = new OperationService(config, transactions);
    const fees = operationService.comissionFees;

    fees.forEach(function print(fee) {
      console.log(chalk.greenBright(fee.toFixed(2)));
    });
  }
};

if (transactions) {
  processTransactions();
}
