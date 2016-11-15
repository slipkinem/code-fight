/**
 * Created by slipkinem on 2016/11/14.
 */

const redis = require('redis');
const db = redis.createClient();

module.exports = Entry;

function Entry(obj) {

    for (var index in obj) {
        this[index] = obj[index];
    }
}

Entry.prototype.save = function (fn) {
    var entryJSON = JSON.stringify(this);

    db.lpush(
        'entries',
        entryJSON,
        function (err) {
            if (err) return fn(err);

            fn();
        }
    )
};

Entry.getRange = function (form, to, fn) {
    db.lrange('entries',form,to,function (err, items) {
        if (err) return fn(err);

        var entries = [];

        items.forEach(function (item) {
            entries.push(JSON.parse(item));
        });
        fn(null,entries);
    })
};

Entry.count = function (fn) {
    db.llen('entries',fn);
};