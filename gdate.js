class DatePlus {
  constructor() {
    this.second = 1000
    this.minute = (60 * this.second)
    this.hour = (60 * this.minute)
    this.day = (24 * this.hour)
    this.month = (30* this.day)
    this.year = (365* this.day)

    this.ascendingUnitsAndNames = [
      [this.second, 'second'],
      [this.minute, 'minute'],
      [this.hour, 'hour'],
      [this.day, 'day'],
      [this.month, 'month'],
      [this.year, 'year']
    ]

    this.ascendingUnits = this.ascendingUnitsAndNames.map(unit => unit[0])
    this.ascendingNames = this.ascendingUnitsAndNames.map(unit => unit[1])
  }

  advance( date = new Date() ) {
    return {
      by: ( distance = 0 ) => {
        return new Date(date.getTime() + distance)
      }
    }
  }

  get( unit = 1 ) {
    return {
      between: ( date1, date2 = new Date() ) => {
        let distance = Math.abs(date2.getTime() - date1.getTime());
        return distance / unit;
      }
    }
  }

  getWhole( unit = 1 ) {
    return {
      between: ( date1, date2 = new Date() ) => {
        let distance = Math.abs(date2.getTime() - date1.getTime());
        return Math.floor(distance / unit);
      }
    }
  }

  is( test = new Date() ) {
    return {
      after: ( ref = new Date() ) => {
        return test.getTime() > ref.getTime();
      },
      before: ( ref = new Date() ) => {
        return test.getTime() < ref.getTime();
      },
      between: ( ref1, ref2 = new Date() ) => {
        let small = Math.min(ref1.getTime(), ref2.getTime());
        let big = Math.max(ref1.getTime(), ref2.getTime());
        let testDist = test.getTime() - small;
        let bigDist = big - small;
        return 0 <= testDist && testDist <= bigDist;
      }
    }
  }

  createYYYYMMDD(date = new Date() ) {
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    while(year.length < 4) year = `0${year}`;
    while(month.length < 2) month = `0${month}`;
    while(day.length < 2) day = `0${day}`;
    return [year, month, day].join('/');
  }

  getRelativeDistance(date1, date2 = new Date() ) {
    let mSeconds = Math.abs(date1.getTime() - date2.getTime());
    for (let i = 0; i < this.ascendingUnits.length; i++) {
      let limit = this.ascendingUnits[i + 1]
      let unit = this.ascendingUnits[i];
      let name = this.ascendingNames[i];
      if(mSeconds < limit) {
        let amount = Math.floor(mSeconds / unit);
        return `${amount} ${name}${amount === 1 ? '' : 's'}`;
      }
    }
    return `${this.getApproximate(this.year, mSeconds)} years`;
  }
}

let gdate = new DatePlus();
module.exports = gdate;
