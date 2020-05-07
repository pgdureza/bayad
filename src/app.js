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

  const operationService = new OperationService(config, transactions);
  const fees = operationService.comissionFees;

  fees.forEach(function print(fee) {
    // eslint-disable-next-line no-console
    console.log(fee.toFixed(2));
  });
};

processTransactions();
