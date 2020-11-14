# GDATE, Mate!

`gdate` (pronounced g'date, if you like) is a light-weight extension to the native Date object.  Date has a surprising amount of functionality built in, but equally surprising is the functionality it's lacking. (seriously, checkout the code I wrote.... it's nothing mind-blowing, and feels so intuitive).

So like many others on npm, I wrote an extension to it that you can import into whatever project you like.
It is tested (see the linked github), and open-source? still in development? If anyone would like easy open-source credits to put on a resumé, feel welcome to add an issue!

Import it with the usual installation commands in terminal i.e. `npm install gdate`.

Features:

- Built-in time properties (like `hour`s and `day`s ) for easy reference
- `advanceDateBy`: Get new Date instances a set amount of time away

  ```JavaScript

    const now = new Date();
    const tomorrow = gdate.advanceDateBy(1 * gdate.day, now);
    const yesterday = gdate.advanceDateBy(-1 * gdate.day, now);
  ```

- `unitsBetween`: Get the number of units between 2 dates (order agnostic)

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advanceDateBy(1 * gdate.day, now);
  const hours = gdate.unitsBetween(gdate.hour, now, tomorrow); // 24
```

- `isBetween`: returns `true` if a given Date is between two reference dates, inclusively. Otherwise, `false`

```JavaScript
  const now = new Date();
  const hourLater = gdate.advanceDateBy(1 * gdate.hour, now);
  const tomorrow = gdate.advanceDateBy(1 * gdate.day, now);

  gdate.isBetween(now, hourLater, tomorrow) // true
  gdate.isBetween(now, tomorrow, hourLater) // false
```

- `isBefore`: return `true` if a date is strictly before a reference. else `false`

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advanceDateBy(1 * gdate.day, now);

  gdate.isBefore(now, tomorrow) // true
  gdate.isBefore(tomorrow, now) // false
```

- `isAfter`: return `true` if a date is strictly before a reference. else `false`

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advanceDateBy(1 * gdate.day, now);

  gdate.isBefore(now, tomorrow) // false
  gdate.isBefore(tomorrow, now) // true
```

- `createYYYYMMDD`: converts the date into a string of the form `YYYY/MM/DD`

```JavaScript
  const epoch = new Date(0)

  gdate.createYYYYMMDD(epoch) // "1970/01/01"
```

`getRelativeDistance`: Returns a string of the distance between 2 Dates in the largest whole unit of time (with correct pluralization). Great for Reddit-Style Time-stamps

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advanceDateBy(1 * gdate.day, now);
  const year = gdate.advanceDateBy(3 * gdate.year, now);

  gdate.getRelativeDistance(now, tomorrow) // "1 day"
  gdate.getRelativeDistance(now, year) // "3 years"
```

`getApproximate`: returns the whole number of units that a given number of milliseconds corresponds to, rounded down.

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advanceDateBy(1 * gdate.day, now);

  const nowInMS = now.getTime();
  const tomInMS = now.getTime();

  gdate.getRelativeDistance(gdate.hour, tomInMS - nowInMS) // 24
```
