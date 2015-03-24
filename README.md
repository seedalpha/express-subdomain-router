# express-subdomain-router

Express 4 subdomain router. Inspired by `express-subdomain`.

[![NPM Package](https://img.shields.io/npm/v/express-subdomain-router.svg?style=flat)](https://www.npmjs.org/package/express-subdomain-router)
[![Build Status](https://travis-ci.org/seedalpha/express-subdomain-router.svg?branch=master)](https://travis-ci.org/seedalpha/express-subdomain-router/branches)
[![Dependencies](https://david-dm.org/seedalpha/express-subdomain-router.svg)](https://david-dm.org/seedalpha/express-subdomain-router)

### Usage

```javascript

var express   = require('express');
var subdomain = require('express-subdomain-router');

var app = express();

// simple nested
var api = express.Router();
var v1 = express.Router();
var v2 = express.Router();

app.use(subdomain('api', api));
api.use(subdomain('v1', v1));
api.use(subdomain('v2', v2));

// simple multi match
var test = express.Router();
app.use(subdomain('d.e.f', test));

test.use('a.b.c', function(req, res, next) {
  res.send('You've successfully navigated to a.b.c.d.e.f.example.com');
});

// wildcard
var router = express.Router();

app.use(subdomain('*', router));         // matches any single subdomain will do
app.use(subdomain('*.support', router)); // matches `en.support.example.com`, `ru.support.example.com`, etc.

```

### Installation

    $ npm install express-subdomain-router --save

### Development

    $ git clone git@github.com:seedalpha/express-subdomain-router.git
    $ cd express-subdomain-router
    $ npm install
    $ npm test

### License

The MIT License (MIT)
Copyright © 2015 SeedAlpha

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.