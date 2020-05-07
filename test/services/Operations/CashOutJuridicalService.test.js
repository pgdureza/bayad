const CashOutJuridicalService = require('../../../src/services/Operations/CashOutJuridicalService');

const config = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: 'EUR'
  }
};

describe('CashOutJuridicalService', () => {
  const service = new CashOutJuridicalService(config);
  describe('calculateFee', () => {
    it('returns a percentage of the total amount based on config', () => {
      expect(service.calculateFee(300)).toBe(0.9);
      expect(service.calculateFee(200)).toBe(0.6);
    });
    it('returns min amount if fee is less than the min amount in config', () => {
      expect(service.calculateFee(100)).toBe(0.5);
      expect(service.calculateFee(3)).toBe(0.5);
    });
  });
});
