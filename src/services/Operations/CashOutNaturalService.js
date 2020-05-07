const isSameISOWeek = require('date-fns/isSameISOWeek');
const parseISO = require('date-fns/parseISO');

class CashOutNaturalService {
  constructor(config) {
    this.config = config;
  }

  static updateUserOperations(userId, date, amount) {
    this.operationsByUserId[userId] = { amount, date };
  }

  static getUserLastOperationDate(userId) {
    const userLastOperation = CashOutNaturalService.operationsByUserId[userId];
    if (!userLastOperation) {
      return null;
    }
    return userLastOperation.date;
  }

  calculateFee(amount, date, userId) {
    const lastDate = CashOutNaturalService.getUserLastOperationDate(userId);
    const isSameWeek = isSameISOWeek(parseISO(lastDate), parseISO(date), {
      weekStartsOn: 1
    });

    let totalAmountThisWeek;
    if (isSameWeek) {
      const lastAmount = CashOutNaturalService.operationsByUserId[userId].amount;
      totalAmountThisWeek = lastAmount + amount;
    } else {
      totalAmountThisWeek = amount;
    }
    CashOutNaturalService.updateUserOperations(
      userId,
      date,
      Math.min(totalAmountThisWeek, this.config.week_limit.amount)
    );

    if (totalAmountThisWeek <= this.config.week_limit.amount) {
      return 0;
    }

    const weeklyExcessToLimit = totalAmountThisWeek - this.config.week_limit.amount;
    return (weeklyExcessToLimit * this.config.percents) / 100;
  }
}

CashOutNaturalService.operationsByUserId = {};

module.exports = CashOutNaturalService;
