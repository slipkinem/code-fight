/**
 * Created by slipkinem on 2016/11/12.
 */

const connect = require('connect');

const app = connect();
//connect中间件，会调用next;
app.use(logger)
    .use('/admin',restrict)  //admin 能定义
    .use('/admin',admin)
    .use(hello)
    .listen(3000,function () {
    console.log('server started');
});

function logger(request,resoponse,next) {
    console.log(request.method,'-',request.url);
    next();
}

function hello(request, response, next) {
    response.setHeader('Content-Type','text/plain');
    response.end('hello world');
    next();
}

function restrict(request, response, next) {
    var authorization = request.headers.authorization;
    console.log(request);
    if (!authorization) {
        return next(new Error('Unauthorization'));
    }

    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1],'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    authenticateWithDatabase(user,pass,function (err) {
        if (err) throw err;

        next();
    })
}

function admin(request, response, next) {
    switch (request.url) {
        case '/':
            response.end('try/users');
            break;
        case '/users':
            response.setHeader('Content-Type','application/json');
            response.end(JSON.stringify(['tobi','loki','jane']));
            break;
    }
}

