/**
 * Created by slipkinem on 2016/11/15.
 */

const express = require('express');
const User = require('../lib/user');
const Entry = require('../lib/entry');

exports.auth = express.basicAuth(User.authenticate);

/**
 * user路由
 * @param req
 * @param res
 * @param next
 */
exports.user = function (req, res, next) {
    User.get(req.param.id,function (err, user) {
        if (err) return next(err);

        if (!user.id) return res.send(404);

        res.json(user);
    })
};

/**
 * api.entries
 * @param req
 * @param res
 * @param next
 */
exports.entries = function (req, res, next) {
    var page = req.page;

    Entry.getRange(page.from,page.to,function (err, entries) {
        if (err) return next(err);
        // res.format({
        //     'application/json':function () {
        //         res.send(entries);
        //     },
        //     'application/xml':function () {
        //         res.write('<entries>\n');
        //         entries.forEach(function (entry) {
        //             res.write('<entry>\n');
        //             res.write('<title>' + entry.title + '</title>\n');
        //             res.write('<body>' + entry.body + '</body>\n');
        //             res.write('<username>' + entry.username + '</username>\n');
        //             res.write('</entry>\n');
        //         });
        //         res.end('</entries>');
        //     }
        // });
        // res.json(entries);

        res.format({
            json:function () {
                res.send(entries);
            },
            xml:function () {
                res.render('entries/xml',{entries:entries});
            }
        })
    })
};