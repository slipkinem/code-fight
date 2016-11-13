/**
 * Created by slipkinem on 2016/11/12.
 */

function errorHandler() {
    var env = process.env.NODE_ENV || 'development'; //切换生产环境和开发环境
    return function (err, request, response, next) {
        response.statusCode = 500;
        switch (env) {
            case 'development':
                response.setHeader('Content-Type','application/json');
                response.end(JSON.stringify(err));
                break;
            default:
                response.end('Server error');
        }
    }
}