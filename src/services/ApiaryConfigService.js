const chalk = require('chalk');
const network = require('../utils/network');

class ApiaryConfigService {
  constructor() {
    this.baseURL = process.env.API_HOST;
  }

  async initialize() {
    try {
      const [cashOutJuridical, cashOutNatural, cashInConfig] = await Promise.all([
        network.fetch(`${this.baseURL}/config/cash-out/juridical`),
        network.fetch(`${this.baseURL}/config/cash-out/natural`),
        network.fetch(`${this.baseURL}/config/cash-in`)
      ]);

      this.config = {
        cashOut: {
          juridical: cashOutJuridical,
          natural: cashOutNatural
        },
        cashIn: cashInConfig
      };
    } catch (error) {
      console.error(
        chalk.redBright(
          'Unable to get config from API. Please check if API is live or if API_HOST is correct.'
        )
      );
    }
  }
}

module.exports = ApiaryConfigService;
