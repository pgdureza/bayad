const CashInService = require('./CashInService');
const CashOutJuridicalService = require('./CashOutJuridicalService');
const CashOutNaturalService = require('./CashOutNaturalService');

module.exports = class OperationService {
  constructor(config, transactions) {
    this.cashInFee = new CashInService(config.cashIn);
    this.cashOutNaturalFee = new CashOutNaturalService(config.cashOut.natural);
    this.cashOutJuridicalFee = new CashOutJuridicalService(config.cashOut.juridical);
    this.comissionFees = this.getCommissionFees(transactions);
  }

  getCommissionFees(transactions) {
    return transactions.map(transaction => {
      const { type, user_type: userType, operation, date, user_id: userId } = transaction;
      const { amount } = operation;

      return this.calculateFee(amount, type, userType, userId, date);
    });
  }

  calculateFee(amount, type, userType, userId, date) {
    if (type === 'cash_out') {
      if (userType === 'juridical') {
        return this.cashOutJuridicalFee.calculateFee(amount);
      }
      if (userType === 'natural') {
        return this.cashOutNaturalFee.calculateFee(amount, date, userId);
      }
    }
    return this.cashInFee.calculateFee(amount);
  }
};
