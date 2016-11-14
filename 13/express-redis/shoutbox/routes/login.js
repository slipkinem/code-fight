/**
 * Created by slipkinem on 2016/11/14.
 */
const User = require('../lib/user');

exports.form = function (req, res) {
    res.render('login',{
        title:'Login'
    })
};

exports.submit = function (req, res, next) {
    var data = req.body.user;

    User.authenticate(data.name,data.pass,function (err, user) {
        if (err) next(err);

        if(user) {
            req.session.uid = user.id;
            res.redirect('/');
        } else {
            res.error("找不到用户！");
            res.redirect('back');
        }
    })
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
        res.redirect('/');
    })
};

