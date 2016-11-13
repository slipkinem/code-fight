/**
 * Created by slipkinem on 2016/11/13.
 */

const connect = require('connect');

var app = connect().use(connect.cookieParser('tobi is a coll man'))
                    .use(function (request, response) {
                        console.log(request.cookies);
                        console.log(request.signedCookies);
                        response.end('hello\n')
                    }).listen(3001,function () {
                        console.log('server started');
                    });
