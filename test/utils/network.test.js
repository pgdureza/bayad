const network = require('../../src/utils/network');

describe('network', () => {
  describe('fetch', () => {
    it('fetches data from passed url and returns as json', async () => {
      const config = await network.fetch(
        'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical'
      );
      expect(config).toEqual({ min: { amount: 0.5, currency: 'EUR' }, percents: 0.3 });
    });
  });
});
