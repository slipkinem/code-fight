/**
 * Created by slipkinem on 2016/11/13.
 */

const connect = require('connect');
const bodyParser = require('body-parser');
const logger = require('logger');
const methodOverride = require('method-override');

function edit(request, response, next) {
    if ('GET' != request.method) return next();
    
    response.setHeader('Content-Type','text/html');
    
    response.end(
        `<form method="post">
            <input type="hidden" name="_method" value="put">
            <input type="text" name="user[name]" value="tobi">
            <input type="submit" value="update">
        </form>`
    )
}

function update(request, response, next) {
    if ('PUT' != request.method) return next();

    response.end('Update time to:' + request.body.user.name);
}

var app = connect();
app.use(logger('dev'))
    .use(bodyParser())
    .use(methodOverride())
    .use(edit)
    .use(update)
    .listen(3000);