const { getRoundedCalculatedFee } = require('../../utils/math');

module.exports = class CashOutJuridicalService {
  constructor(config) {
    this.config = config;
  }

  calculateFee(amount) {
    const calculatedValue = getRoundedCalculatedFee(amount, this.config.percents);
    return Math.max(calculatedValue, this.config.min.amount);
  }
};
