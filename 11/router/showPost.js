/**
 * Created by slipkinem on 2016/11/12.
 */

var connect = require('connect');
const url = require('url');


var app = connect()
            .use(rewrite)
            .use(showPost)
            .listen(3000,function () {
                console.info('server started');
            });

function rewrite(request, response, next) {
    var path = url.parse(request.url).pathname;

    var match = path.match(/^\/blog\/post\/(.+)/);

    if (match) {
        findPostIdBySlug(match[1],function (err, id) {
            if (err) throw err;
            if (!id) return next(new Error('User not found'));
            request.url = '/blog/posts' + id;
            next();
        })
    }else {
        next();
    }
}
