/**
 * Created by slipkinem on 2016/11/14.
 */

const User = require('../user');

module.exports = function (req, res, next) {
    var uid = req.session.uid;

    if (!uid) return next();

    User.get(uid,function (err, user) {
        if (err) next(err);
        req.user = res.locals.user = user;
        next();
    })
};