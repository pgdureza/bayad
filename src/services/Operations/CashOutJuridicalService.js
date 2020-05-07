module.exports = class CashOutJuridicalService {
  constructor(config) {
    this.config = config;
  }

  calculateFee(amount) {
    const calculatedValue = (amount * this.config.percents) / 100;
    return Math.max(calculatedValue, this.config.min.amount);
  }
};
