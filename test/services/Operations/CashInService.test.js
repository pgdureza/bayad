const CashInService = require('../../../src/services/Operations/CashInService');

const config = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR'
  }
};

describe('CashInService', () => {
  const service = new CashInService(config);
  describe('calculateFee', () => {
    it('returns a percentage of the total amount based on config', () => {
      expect(service.calculateFee(300)).toBe(0.09);
      expect(service.calculateFee(200)).toBe(0.06);
    });
    it('returns max amount if fee exceeds the max amount in config', () => {
      expect(service.calculateFee(3000000)).toBe(5);
      expect(service.calculateFee(1000000)).toBe(5);
    });
  });
});
