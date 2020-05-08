const { getRoundedCalculatedFee } = require('../../utils/math');
const getWeekTotalAmount = require('../../utils/getWeekTotalAmount');

module.exports = class CashOutNaturalService {
  constructor(config) {
    this.config = config;
    this.operationsByUserId = {};
  }

  updateUserLastOperations(userId, date, amount) {
    this.operationsByUserId[userId] = { amount, date };
  }

  getUserLastOperation(userId) {
    return this.operationsByUserId[userId] || {};
  }

  calculateFee(amount, date, userId) {
    const { date: lastDate, amount: lastAmount } = this.getUserLastOperation(userId);

    const totalAmountThisWeek = getWeekTotalAmount(lastDate, date, lastAmount, amount);

    this.updateUserLastOperations(
      userId,
      date,
      Math.min(totalAmountThisWeek, this.config.week_limit.amount)
    );

    if (totalAmountThisWeek <= this.config.week_limit.amount) {
      return 0;
    }

    const weeklyExcessToLimit = totalAmountThisWeek - this.config.week_limit.amount;
    return getRoundedCalculatedFee(weeklyExcessToLimit, this.config.percents);
  }
};
