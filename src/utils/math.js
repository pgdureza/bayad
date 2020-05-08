function calculatePercentageFromX(amount, percent) {
  return (amount * percent) / 100;
}

function roundUpPrice(amount) {
  return Math.ceil(amount * 100) / 100;
}

function getRoundedCalculatedFee(amount, percent) {
  return roundUpPrice(calculatePercentageFromX(amount, percent));
}

module.exports = { getRoundedCalculatedFee, roundUpPrice, calculatePercentageFromX };
