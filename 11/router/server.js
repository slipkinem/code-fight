/**
 * Created by slipkinem on 2016/11/12.
 */

// http request -> request.method? -> request.url -> return something;

const parse = require('url').parse;

function router(obj) {
    return function (request, response, next) {
        if (!obj[request.method]) {
            return next();
        }

        var routes = obj[request.method];
        var url = parse(request.url);
        var paths = Object.keys(routes);

        for (var i = 0;i < paths.length; i++) {

            var path = paths[i];

            var fn = routes[path];

            path = path.replace(/\//g,'\\/')
                .replace(/:(w+)/g,'([^\\/]+)');
            var re = new RegExp('^' + path + '$');

            var captures = url.pathname.match(re);

            if (captures) {
                var args = [request,response].concat(captures.slice(1));  //从数组第一个开始截取，返回新数组
                fn.apply(null,args); //展开数组参数
                return;
            }
        }
        next();
    }
}

module.export = router;