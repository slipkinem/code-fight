/**
 * Created by slipkinem on 2016/11/14.
 */
const Entry = require('../lib/entry');
/**
 * entries.ejs
 * @param req
 * @param res
 * @param next
 */
exports.list = function (req, res, next) {
    var page = req.page;

    Entry.getRange(page.from,page.to,function (err, entries) {
        if (err) return next(err);

        res.render('entries',{
            title:'Entries',
            entries:entries
        })
    })
};
/**
 * post.ejs
 * @param req
 * @param res
 */
exports.form = function (req, res) {
    res.render('post',{
        title:'Post',
    })
};
/**
 * post.ejs submit
 * @param req
 * @param res
 * @param next
 */
exports.submit = function (req, res, next) {
    var data = req.body.entry;

    if (!data.title){
        res.error('Title is require');
        res.redirect('back');
        return;
    }
    var entry = new Entry({
        "username":res.locals.user.name,
        "title":data.title,
        "body":data.body
    });

    entry.save(function (err) {
        if (err) next(err);

        if (req.remoteUser) {
            res.json({message:'Entry added'});
        } else {
            res.redirect('/');
        }
        res.redirect('/');
    })
};