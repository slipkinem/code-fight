/**
 * Created by slipkinem on 2016/11/14.
 */

const express = require('express');

var res = express.response;

res.message = function (msg, type) {
    type = type || 'info';

    var sess = this.req.session;
    sess.message = sess.message || [];
    sess.message.push({
        type: type,
        string: msg
    })
};

res.error = function (msg) {
    return this.message(msg,'error');
};

module.exports = function (req, res, next) {
    res.locals.message = req.session.message || [];

    res.locals.removeMessage = function () {
        req.session.message = [];
    };
    next();
};