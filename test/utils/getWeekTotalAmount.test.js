const getWeekTotalAmount = require('../../src/utils/getWeekTotalAmount');

describe('getWeekTotalAmount', () => {
  describe('when last date and new date are in the same week', () => {
    it('returns the sum of last amount and the new amount', () => {
      expect(getWeekTotalAmount('2016-02-01', '2016-02-02', 100, 200)).toBe(300);
      expect(getWeekTotalAmount('2016-02-03', '2016-02-04', 99, 100)).toBe(199);
      expect(getWeekTotalAmount('2016-02-04', '2016-02-04', 800, 100)).toBe(900);
    });
  });
  describe('when last date and new date are in different weeks', () => {
    it('returns the the current amount only since week total already refreshed', () => {
      expect(getWeekTotalAmount('2016-02-04', '2016-02-08', 123, 333)).toBe(333);
      expect(getWeekTotalAmount('2016-02-10', '2016-03-08', 800, 10)).toBe(10);
    });
  });
});
