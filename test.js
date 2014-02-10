var test  = require('tape');

/*
var env = process.env;

if (env.ALIAS  === undefined) throw Error('Environment missing ALIAS');
if (env.KEY    === undefined) throw Error('Environment missing KEY');
if (env.SECRET === undefined) throw Error('Environment missing SECRET');
*/

// stubs
var MaxCDN = require('maxcdn');
MaxCDN.prototype.get = function maxcdnGetStub(path, callback) {
    var res = { data: { } };
    if (path === '/zones/pull.json') {
        res.data.pullzones = [ { id: 12345 }, { id: 23456 } ];
    } else {
        res.data.pushzones = [ { id: 54321 }, { id: 65432 } ];
    }

    callback(null, res);
};

MaxCDN.prototype.delete = function maxcdnGetStub(_, callback) {
    callback(null, { code: 200 });
};

var purge = require('./purge');

test('purge', function (t) {
    t.plan(7);
    purge({
        alias:  'alias',
        key:    'key',
        secret: 'secret'
    }, function (err, res) {
        t.notOk(err, 'sans errors');
        t.ok(res, 'with results');
        t.equal(res.length, 4);
        res.forEach(function (r) {
            t.equal(r.response.code, 200, '200 OK');
        });
    });
});

