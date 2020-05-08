const { calculatePercentageFromX, roundUpPrice } = require('../../src/utils/math');

describe('calculatePercentageFromX', () => {
  it('gets the percentage value of the amount', () => {
    expect(calculatePercentageFromX(100, 0.01)).toBe(0.01);
  });
});

describe('roundUpPrice', () => {
  it('rounds up price to 2 decimal places', () => {
    expect(roundUpPrice(100)).toBe(100);
    expect(roundUpPrice(100.333333)).toBe(100.34);
    expect(roundUpPrice(100.333339)).toBe(100.34);
    expect(roundUpPrice(100.333339)).toBe(100.34);
  });
});
