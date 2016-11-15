/**
 * Created by slipkinem on 2016/11/15.
 */

function parseFiled(field) {
    return field.split(/\[|\]/).filter(function (s) {
        return s;
    })
}

function getFiled(req, filed) {
    var val = req.body;

    filed.forEach(function (prop) {
        val = val[prop];
    });
    return val;
}


exports.required = function (filed) {
    filed = parseFiled(filed);
    return function (req, res, next) {
        if (getFiled(req,filed)){
            next();
        } else {
            res.error(filed.join(' ') + 'is required');
            res.redirect('back');
        }
    }
};

exports.lengthAbove = function (filed, len) {
    filed = parseFiled(filed);
    return function (req, res, next) {
        if (getFiled(req,filed).length > len){
            next();
        } else {
            res.error(filed.join(' ') + 'must have more than' + len + ' characters');
            res.redirect('back');
        }
    }
};