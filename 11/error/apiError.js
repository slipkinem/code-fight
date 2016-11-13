/**
 * Created by slipkinem on 2016/11/12.
 */
var connect = require('connect');

var api = connect()
            .use(users)
            .use(pets)
            .use(errorHandler);

var app = connect()
            .use(hello)
            .use('/api',api)
            .use(errorPage)
            .listen(3000,function () {
                console.log('Server started');
            });

function hello(request, response, next) {
    if (request.url.match(/^\/hello/)) {
        response.end('hello world\n');
    }else {
        next();
    }
}

var db = {
    users:[
        {name:'tobi'},
        {name:'lvsen'},
        {name:'wuna'}
    ]
};

function users(request, response, next) {var match = request.url.match(/^\/user\/(.+)/);  // '/user/2'

    if (match) {
        var user = db.users[match[1]];

        if (user) {
            response.setHeader('Content-Type','application/json');
            response.end(JSON.stringify(user));
        } else {
            var err = new Error('User is not found');
            err.notFound = true;
            next(err);
        }
    }else {
        next();
    }
}

function pets(requset, respose, next) {
    if (requset.url.match(/^\/pet\/(.+)/)) {
        foo();
    } else {
        next();
    }
}


function errorHandler(err, request, response, next) {
    response.setHeader('Content-Type','application/json');

    if (err.notFound) {
        response.statusCode = 404;
        response.end(JSON.stringify({error:err.message}));
    }else {
        response.statusCode = 500;
        response.end(JSON.stringify({error:'Internal Server Error'}));
    }
}

function errorPage(err, request, response, next) {
    if (err) {
        response.statusCode = 404;
        response.end('Hello not found');
    }
}