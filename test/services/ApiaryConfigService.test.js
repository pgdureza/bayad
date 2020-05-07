const ApiaryConfigService = require('../../src/services/ApiaryConfigService');
const network = require('../../src/utils/network');

describe('ApiaryConfigService', () => {
  describe('initialize', () => {
    it('call retrieves the configs for each operation', async () => {
      jest.spyOn(network, 'fetch').mockImplementation(() => ({ data: '...' }));

      process.env.API_HOST = 'http://base/';

      const service = new ApiaryConfigService();
      await service.initialize();

      expect(network.fetch).toHaveBeenCalledTimes(3);
      expect(network.fetch).toHaveBeenCalledWith('http://base//config/cash-out/juridical');
      expect(network.fetch).toHaveBeenCalledWith('http://base//config/cash-out/natural');
      expect(network.fetch).toHaveBeenCalledWith('http://base//config/cash-in');

      expect(service.config).toEqual({
        cashIn: {
          data: '...'
        },
        cashOut: {
          juridical: {
            data: '...'
          },
          natural: {
            data: '...'
          }
        }
      });
    });
  });
});
