module.exports = class CashInService {
  constructor(config) {
    this.config = config;
  }

  calculateFee(amount) {
    const calculatedValue = (amount * this.config.percents) / 100;
    return Math.min(calculatedValue, this.config.max.amount);
  }
};
