const { getRoundedCalculatedFee } = require('../../utils/math');

module.exports = class CashInService {
  constructor(config) {
    this.config = config;
  }

  calculateFee(amount) {
    const calculatedValue = getRoundedCalculatedFee(amount, this.config.percents);
    return Math.min(calculatedValue, this.config.max.amount);
  }
};
