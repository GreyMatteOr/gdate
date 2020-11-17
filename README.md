# GDATE, Mate!

`gdate` (pronounced g'date, if you like) is a light-weight extension to the native Date object.  Date has a surprising amount of functionality built in, but equally surprising is the functionality it's lacking. (seriously, checkout the code I wrote.... it's nothing mind-blowing, and feels so intuitive).

So like many others on npm, I wrote an extension to it that you can import into whatever project you like.
It is tested (see the linked github), and open-source? still in development? If anyone would like easy open-source credits to put on a resumé, feel welcome to add an issue!

Import it with the usual installation commands in terminal i.e. `npm install gdate`.

Features:

- Built-in time properties for easy reference
  - `second`
  - `minute`
  - `hour`
  - `day`
  - `week`
  - `month` (note: these are set at 30-days. Useful for estimation)
  - `year`

You can use them like this:

```JavaScript
gdate.second
gdate.day
```

Or, if you're doing a lot of time math, you can use destructuring to make them easier use (this is what will be used for all of the following examples) :

```
 const { second, minute, hour, day, week, month, year } = gdate;

 console.log( minute ) // 60000
```

- `advance( Date ).by( distance )`: Get new Date instances a set amount of time away

  ```JavaScript

    const now = new Date();
    const tomorrow = gdate.advance( now ).by( 1 * day );
    const yesterday = gdate.advance( now ).by( -1 * day );
  ```

- `get( unit ).between( ref1, ref2 )`: Get the number of units between 2 dates (order agnostic)

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advance( now ).by( 1 * gdate.day );

  gdate.get( hour ).between( now, tomorrow ); // 24
```

`getWhole( unit ).between( ref1, ref2 )`: returns the whole number of units that a given number of milliseconds corresponds to, rounded down.

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advance( now ).by( 1 * gdate.day );

  const nowInMS = now.getTime();
  const tomInMS = now.getTime();

  gdate.getWhole( hour ).between( tomInMS - nowInMS ) // 24
```

- `is( Date ).between( ref1, ref2)`: returns `true` if a given Date is between two reference dates, inclusively and order agnostically. Otherwise, `false`

```JavaScript
  const now = new Date();
  const hourFromNow = gdate.advance( now ).by(1 * gdate.hour );
  const tomorrow = gdate.advance( now ).by( 1 * gdate.day );

  gdate.is( hourFromNow ).between( now, tomorrow) // true
  gdate.is( now ).between( tomorrow, hourFromNow ) // false
```

- `isBefore`: return `true` if a date is strictly before a reference. else `false`

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advance( now ).by( 1 * gdate.day );

  gdate.is( now ).before( tomorrow ) // true
  gdate.is( tomorrow ).before( now ) // false
```

- `isAfter`: return `true` if a date is strictly after a reference. else `false`

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advance( now ).by( 1 * gdate.hour );

  gdate.is( now ).after( tomorrow ) // false
  gdate.is( tomorrow ).after( now ) // true
```

- `getYYYYMMDD`: converts the date into a string of the form `YYYY/MM/DD`

```JavaScript
  const epoch = new Date(0)

  gdate.getYYYYMMDD(epoch) // "1970/01/01"
```

`getRelativeDistance`: Returns a string of the distance between 2 Dates in the largest whole unit of time (with correct pluralization). Great for Reddit-Style Time-stamps

```JavaScript
  const now = new Date();
  const tomorrow = gdate.advance( now ).by( 1 * gdate.day );
  const year = gdate.advanceDateBy(3 * gdate.year, now);

  gdate.getRelativeDistance(now, tomorrow) // "1 day"
  gdate.getRelativeDistance(now, year) // "3 years"
```
