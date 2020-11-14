const gdate = require('./gdate.js');

describe('gdate', () => {
    let date = new Date(2020, 0, 1);
    let dayAfter = new Date(2020, 0, 2);
    let dayBefore = new Date(2019, 11, 31);

  describe('advanceDateBy()', () => {

    it('should return a Date object corresponding to the Date a given distance away from a reference Date', () => {

      expect(gdate.advanceDateBy(gdate.day, date).getTime()).toEqual(dayAfter.getTime());
      expect(gdate.advanceDateBy(-gdate.day, date).getTime()).toEqual(dayBefore.getTime());
    });
  });

  describe('unitsBetween()', () => {

    it('should return the number of given units that are between 2 given Dates', () => {

      expect(gdate.unitsBetween(gdate.day, dayBefore, date)).toEqual(1);
      expect(gdate.unitsBetween(gdate.day, dayBefore, dayAfter)).toEqual(2);
      expect(gdate.unitsBetween(gdate.day, date, date)).toEqual(0);

      let oneMinuteAfter = gdate.advanceDateBy(gdate.minute, date);

      expect(gdate.unitsBetween(gdate.day, date, oneMinuteAfter)).toEqual(0);
      expect(gdate.unitsBetween(gdate.hour, date, oneMinuteAfter)).toEqual(0);
      expect(gdate.unitsBetween(gdate.minute, date, oneMinuteAfter)).toEqual(1);
      expect(gdate.unitsBetween(gdate.second, date, oneMinuteAfter)).toEqual(60);

    });
  });

  describe('isBetween()', () => {

    it('should return `true` if a date falls between 2 dates (inclusive)', () => {

      expect(gdate.isBetween(dayBefore, date, dayAfter)).toEqual(true);
      expect(gdate.isBetween(dayBefore, dayBefore, dayAfter)).toEqual(true);
      expect(gdate.isBetween(dayBefore, dayAfter, dayAfter)).toEqual(true);
    });

    it('should return `false` if a date falls between 2 dates (inclusive)', () => {
      let oneMSBeforeYesterday = new Date( dayBefore.getTime() - 1);
      let oneMSAfterTomorrow = new Date ( dayAfter.getTime() + 1);

      expect(gdate.isBetween(dayBefore, oneMSBeforeYesterday, dayAfter)).toEqual(false);
      expect(gdate.isBetween(dayBefore, oneMSAfterTomorrow, dayAfter)).toEqual(false);
    });
  });

  describe('isBefore()', () => {

    it('should return `true` if a Date falls before a reference date', () => {

      expect(gdate.isBefore(dayBefore, date)).toEqual(true);
      expect(gdate.isBefore(date, dayAfter)).toEqual(true);
    });

    it('should return `false` if a Date doesn\'t come before it', () => {

      expect(gdate.isBefore(dayAfter, date)).toEqual(false);
      expect(gdate.isBefore(date, dayBefore)).toEqual(false);
      expect(gdate.isBefore(date, date)).toEqual(false);
    });
  });

  describe('isAfter()', () => {

    it('should return `true` if a Date falls after a reference date', () => {

      expect(gdate.isAfter(date, dayBefore)).toEqual(true);
      expect(gdate.isAfter(dayAfter, date)).toEqual(true);
    });

    it('should return `false` if a Date doesn\'t come after it', () => {

      expect(gdate.isAfter(date, dayAfter)).toEqual(false);
      expect(gdate.isAfter(dayBefore, date)).toEqual(false);
      expect(gdate.isAfter(date, date)).toEqual(false);
    });
  });

  describe('createYYYYMMDD', () => {

    it('should return a string of the date in `YYYY/MM/DD format`', () => {

      expect(gdate.createYYYYMMDD(date)).toEqual('2020/01/01')
      expect(gdate.createYYYYMMDD(dayBefore)).toEqual('2019/12/31');
    });
  });

  describe('getRelativeDistance', () => {

    it('should return a string of roughly the time between two dates', () => {

      expect(gdate.getRelativeDistance(date, dayAfter)).toEqual('1 day');
      expect(gdate.getRelativeDistance(dayBefore, dayAfter)).toEqual('2 days');
    })
  });
});
