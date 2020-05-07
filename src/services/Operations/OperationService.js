const CashInService = require('./CashInService');
const CashOutJuridicalService = require('./CashOutJuridicalService');
const CashOutTransactionNatural = require('./CashOutNaturalService');

module.exports = class OperationService {
  constructor(config, transactions) {
    this.config = config;
    this.comissionFees = this.getCommissionFees(transactions);
  }

  getCommissionFees(transactions) {
    const comissionFees = transactions.map(transaction => {
      const { type, user_type: userType, operation, date, user_id: userId } = transaction;
      const { amount } = operation;

      return this.calculateFee(amount, type, userType, userId, date);
    });
    return comissionFees;
  }

  calculateFee(amount, type, userType, userId, date) {
    if (type === 'cash_out') {
      if (userType === 'juridical') {
        return new CashOutJuridicalService(this.config.cashOut.juridical).calculateFee(amount);
      }
      if (userType === 'natural') {
        return new CashOutTransactionNatural(this.config.cashOut.natural).calculateFee(
          amount,
          date,
          userId
        );
      }
    }
    return new CashInService(this.config.cashIn).calculateFee(amount);
  }
};
