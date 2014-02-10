var MaxCDN = require('maxcdn');
var async  = require('async');

module.exports = function (opts, callback) {
    [ 'alias', 'key', 'secret' ].forEach(function(opt) { // support ALIAS, KEY, SECRET from environment
        opts[opt] = opts[opt] || process.env[opt.toUpperCase()];

        if (typeof opts[opt] === 'undefined') {
            throw new Error('Missing required argument: ' + opt);
        }
    });

    // init MaxCDN
    var maxcdn = new MaxCDN(opts.alias, opts.key, opts.secret);

    opts.pull = opts.pull || [];
    opts.push = opts.push || [];

    var errors;

    if (opts.push == 0 && opts.pull == 0) {
        async.parallel([
            getZones('pull'),
            getZones('push')
        ], function (err) {
            if (err) {
                errors = errors || [];
                errors.push(err);
            }
            purges = [];
            opts.pull.forEach(function (zone) { purges.push(purge('pull', zone)); });
            opts.push.forEach(function (zone) { purges.push(purge('push', zone)); });

            async.parallelLimit(purges, 4, function (err, res) {
                if (err) {
                    errors = errors || [];
                    errors.push(err);
                }
                callback(errors, res);
            });

        });
    }

    function purge(type, zone) {
        return function (cb) {
            maxcdn.delete('/zones/'+type+'.json/'+zone+'/cache', function (err, res) {
                res = { type: type, zone: zone, response: res };
                cb(err, res);
            });
        };
    }

    function getZones(type) {
        return function (cb) {
            maxcdn.get('/zones/'+type+'.json', function (err, res) {
                res.data[type+'zones'].forEach(function (zone) {
                    opts[type].push(zone.id);
                });
                cb(err);
            });
        };
    }
};
