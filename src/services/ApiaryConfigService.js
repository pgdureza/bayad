const network = require('../utils/network');

class ApiaryConfigService {
  constructor() {
    this.baseURL = process.env.API_HOST;
  }

  async initialize() {
    const cashOutJuridical = await network.fetch(`${this.baseURL}/config/cash-out/juridical`);
    const cashOutNatural = await network.fetch(`${this.baseURL}/config/cash-out/natural`);
    const cashInConfig = await network.fetch(`${this.baseURL}/config/cash-in`);
    this.config = {
      cashOut: {
        juridical: cashOutJuridical,
        natural: cashOutNatural
      },
      cashIn: cashInConfig
    };
  }
}

module.exports = ApiaryConfigService;
