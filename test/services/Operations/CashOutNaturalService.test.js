const CashOutNaturalService = require('../../../src/services/Operations/CashOutNaturalService');

const config = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: 'EUR'
  }
};

describe('CashOutNaturalService', () => {
  const service = new CashOutNaturalService(config);
  describe('calculateFee', () => {
    describe('for users that have not reached weekly limit', () => {
      it('returns 0', () => {
        expect(service.calculateFee(999, '2016-01-05', 1)).toBe(0);
        expect(service.calculateFee(1, '2016-01-06', 1)).toBe(0);
        expect(service.calculateFee(500, '2016-01-07', 2)).toBe(0);
        expect(service.calculateFee(300, '2016-01-08', 2)).toBe(0);
      });
    });

    describe('for users that have reached the weekly limit', () => {
      it('returns a percentage of the excess from the weekly limit', () => {
        expect(service.calculateFee(1000, '2016-02-04', 3)).toBe(0);
        expect(service.calculateFee(200, '2016-02-05', 3)).toBe(0.6);
        expect(service.calculateFee(200, '2016-02-06', 3)).toBe(0.6);
        expect(service.calculateFee(500, '2016-02-06', 3)).toBe(1.5);
      });
    });

    describe('for users that have reached the weekly limit, but the week has already refreshed', () => {
      it('returns 0', () => {
        expect(service.calculateFee(1000, '2016-02-04', 4)).toBe(0);
        expect(service.calculateFee(200, '2016-02-05', 4)).toBe(0.6);
        expect(service.calculateFee(200, '2016-02-06', 4)).toBe(0.6);
        // weekly limit refreshed since Feb 8 is a Monday
        expect(service.calculateFee(500, '2016-02-08', 4)).toBe(0);
        expect(service.calculateFee(500, '2016-02-10', 4)).toBe(0);
        // exceeds weekly limit again for this week
        expect(service.calculateFee(500, '2016-02-13', 4)).toBe(1.5);
        // resets again
        expect(service.calculateFee(999, '2016-02-15', 4)).toBe(0);
      });
    });
  });
});
