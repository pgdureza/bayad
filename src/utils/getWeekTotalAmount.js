const isSameISOWeek = require('date-fns/isSameISOWeek');
const parseISO = require('date-fns/parseISO');

function getWeekTotalAmount(lastDate, date, lastAmount = 0, amount) {
  const isSameWeek = isSameISOWeek(parseISO(lastDate), parseISO(date), {
    weekStartsOn: 1
  });

  let totalAmountThisWeek;
  if (isSameWeek) {
    totalAmountThisWeek = lastAmount + amount;
  } else {
    totalAmountThisWeek = amount;
  }

  return totalAmountThisWeek;
}

module.exports = getWeekTotalAmount;
