const fetchData = require('../utils/fetchData');

class ApiaryConfigService {
  constructor() {
    this.baseURL = process.env.API_HOST;
  }

  async initialize() {
    const cashOutJuridical = await fetchData(`${this.baseURL}/config/cash-out/juridical`);
    const cashOutNatural = await fetchData(`${this.baseURL}/config/cash-out/natural`);
    const cashInConfig = await fetchData(`${this.baseURL}/config/cash-in`);
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
