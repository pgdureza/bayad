const OperationService = require('../../../src/services/Operations/OperationService');

const mockTransactions = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 11111.0, currency: 'EUR' }
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' }
  },
  {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' }
  }
];

const config = {
  cashIn: {
    percents: 0.03,
    max: {
      amount: 5,
      currency: 'EUR'
    }
  },
  cashOut: {
    juridical: {
      percents: 0.3,
      min: {
        amount: 0.5,
        currency: 'EUR'
      }
    },
    natural: {
      percents: 0.3,
      week_limit: {
        amount: 1000,
        currency: 'EUR'
      }
    }
  }
};

describe('OperationService', () => {
  const service = new OperationService(config, mockTransactions);
  describe('comissionFees', () => {
    it('returns an array of commission fees based on configuration and transactions', () => {
      expect(service.comissionFees).toEqual([3.34, 0.9, 87]);
    });
  });
  describe('calculateFee', () => {
    it('returns the commission fee', () => {
      expect(service.calculateFee(300)).toBe(0.09);
      expect(service.calculateFee(200)).toBe(0.06);
    });
  });
});
