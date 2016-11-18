/**
 * Created by slipkinem on 2016/11/16.
 */

var db = [];

exports.save = function (doc, cb) {
    db.push(doc);
    if (cb) {
        setTimeout(function () {
            cb();
        },1000);
    }
};

exports.first = function (obj) {
    return db.filter(function (doc) {
        for (var index in obj) {
            if (doc[index] != obj[index]) {
                return false;
            }
        }
        return true;
    }).shift();
};

exports.clear = function () {
    db = [];
};