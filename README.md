# maxcdn-purge

[![Build Status](https://travis-ci.org/jmervine/maxcdn-purge.png?branch=master)](https://travis-ci.org/jmervine/maxcdn-purge) &nbsp; [![Dependancy Status](https://david-dm.org/jmervine/maxcdn-purge.png)](https://david-dm.org/jmervine/maxcdn-purge) &nbsp; [![NPM Version](https://badge.fury.io/js/maxcdn-purge.png)](https://badge.fury.io/js/maxcdn-purge)

### Install

```
npm install -g maxcdn-purge
```

### CLI

``` bash
# basic usage
$ maxcdn-purge --alias alias --key <consumer_key> --secret <consumer_secret>

# detail usage
$ maxcdn-purge --help
Usage: purge.js --alias ALIAS --key KEY --secret SECRET [OPTIONS]

 Required:
 --alias:  Your consumer alias.
 --key:    Your oauth consumer key.
 --secret: Your oauth consumer secret token.

 Note:
   alias, key and secret can also be read from your environment
   via exporting ALIAS, KEY, and/or SECRET with your credentials.

 Optional:
 --pull:   One or more pull zones to purge.
 --push:   One or more push zones to purge.
 --file:   One or more files to purge.
 --help:   This help message.

 Examples:

 $ ./purge.js --alias ALIAS --key KEY --SECRET --zone 12345 --zone 54321

 $ ./purge.js --alias ALIAS --key KEY --SECRET --zone [ 12345 54321 ]

 $ ./purge.js --alias ALIAS --key KEY --SECRET --zone 12345
 $         --file /master.css --file /master.js

```

### In Node.js

``` javascript
var purge = require('maxcdn-purge');

purge({
    alias:  'alias',
    key:    'consumer_key',
    secret: 'consumer_secret',
    // pull: [ 12345, 23456 ],
    // push: [ 54321, 65432 ],
    // file: [ '/foo.css', '/bar.css' ]
}, function (err, res) {
    if (err) console.trace(err);
    console.dir(res);
});

```

### Development

```
$ git clone https://github.com/jmervine/maxcdn-purge.git
cd maxcdn-purge
npm install
npm test
```
