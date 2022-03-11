# http-date

[![NPM Version][npm-image]][npm-url]
[![codecov](https://codecov.io/gh/rxbryan/js-http-date/branch/main/graph/badge.svg?token=KH56ZAA0WL)](https://codecov.io/gh/rxbryan/js-http-date)
[![HTTP-DATE][http-date-image]](https://github.com/rxbryan/js-http-date#readme)

This module extends the JavaScript `Date` to accept valid HTTP-date 
formats (as defined in RFC 7231) as constructor initializers and generate 
valid IMF_fixdate HTTP-date string format for use in HTTP date header fields.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install http-date
```
Accepts every valid `Date` constructor argument. Overrides the `toString` method of the 
`Date` class, such that a call to the toString returns the preferred HTTP-date format
(as defined in RFC 7231).
The original behaviour can be obtained by calling `toString` with `{format: 'standard'}` as
arguments 
```js
console.log(new httpDate.toString({format: 'standard'}))
```

## Usage

```js
var HttpDate = require('http-date')

httpDate = new HttpDate('Sun, 06 Nov 1994 08:49:37 GMT')
```
Using express

```js
var HttpDate = require('http-date')
var Stats = require('fs').Stats

lastModified = new HttpDate(req.get('if-modified-since'))

if (lastmodified.getTime() < stat.mtime.getTime())
  res.sendFile(file)
```

```js
lastModified = new HttpDate()
res.set('Last-modified', lastModified.toString())
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Bryan Elee](https://github.com/rxbryan) ([rxbryn@gmail.com](mailto:rxbryn@gmail.com))


[npm-url]: https://www.npmjs.com/package/http-date
[npm-image]: https://img.shields.io/badge/npm-v6.14-blue
[http-date-image]: https://img.shields.io/badge/http--date-v1.0.7-success
[http-date-url]: https://github.com/rxbryan/js-http-date#readme