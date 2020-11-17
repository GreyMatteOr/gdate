const gdate = require('./gdate.js');

describe('gdate', () => {
    let date = new Date(2020, 0, 1);
    let dayAfter = new Date(2020, 0, 2);
    let dayBefore = new Date(2019, 11, 31);

  describe('advance( date ).by( unit )', () => {

    it('should return a Date object corresponding to the Date a given distance away from a reference Date', () => {

      expect(gdate.advance(date).by(gdate.day).getTime() ).toEqual( dayAfter.getTime() );
      expect(gdate.advance(date).by(-gdate.day).getTime()).toEqual( dayBefore.getTime() );
    });
  });

  describe('get( units ).between( ref1, ref2 )', () => {

    it('should return the number of given units that are between 2 given Dates', () => {

      expect( gdate.get( gdate.day ).between(dayBefore, date) ).toEqual(1);
      expect( gdate.get( gdate.day ).between(dayBefore, dayAfter) ).toEqual(2);
      expect( gdate.get( gdate.day ).between(date, date) ).toEqual(0);

      let oneMinuteAfter = gdate.advance( date ).by( gdate.minute );

      expect( gdate.get( gdate.day ).between(date, oneMinuteAfter) ).toEqual(1/1440);
      expect( gdate.get( gdate.hour ).between(date, oneMinuteAfter) ).toEqual(1/60);
      expect( gdate.get( gdate.minute ).between(date, oneMinuteAfter) ).toEqual(1);
      expect( gdate.get( gdate.second ).between(date, oneMinuteAfter) ).toEqual(60);

    });
  });

  describe('is( date ).between( ref1, ref2 )', () => {

    it('should return `true` if a date falls between 2 dates (inclusive)', () => {

      expect(gdate.is(date).between(dayBefore, dayAfter)).toEqual(true);
      expect(gdate.is(dayBefore).between(dayBefore, dayAfter)).toEqual(true);
      expect(gdate.is(dayAfter).between(dayBefore, dayAfter)).toEqual(true);
    });

    it('should return `false` if a date falls between 2 dates (inclusive)', () => {
      let oneMSBeforeYesterday = new Date( dayBefore.getTime() - 1);
      let oneMSAfterTomorrow = new Date ( dayAfter.getTime() + 1);

      expect(gdate.is(oneMSBeforeYesterday).between(dayBefore, dayAfter)).toEqual(false);
      expect(gdate.is(oneMSAfterTomorrow).between(dayBefore, dayAfter)).toEqual(false);
    });
  });

  describe('is( date ).before( ref )', () => {

    it('should return `true` if a Date falls before a reference date', () => {

      expect(gdate.is( dayBefore ).before( date )).toEqual(true);
      expect(gdate.is( date ).before( dayAfter )).toEqual(true);
    });

    it('should return `false` if a Date doesn\'t come before it', () => {

      expect(gdate.is( dayAfter ).before( date )).toEqual(false);
      expect(gdate.is( date ).before( dayBefore )).toEqual(false);
      expect(gdate.is( date ).before( date )).toEqual(false);
    });
  });

  describe('is( date ).after( ref )', () => {

    it('should return `true` if a Date falls after a reference date', () => {

      expect(gdate.is( date ).after( dayBefore )).toEqual(true);
      expect(gdate.is( dayAfter ).after( date )).toEqual(true);
    });

    it('should return `false` if a Date doesn\'t come after it', () => {

      expect(gdate.is( date ).after( dayAfter )).toEqual(false);
      expect(gdate.is( dayBefore ).after( date )).toEqual(false);
      expect(gdate.is( date ).after( date )).toEqual(false);
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
