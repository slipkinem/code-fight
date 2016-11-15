
/**
 * Module dependencies.
 */

const express = require('express');
const routes = require('./routes');
const register = require('./routes/register');
const message = require('./lib/message');
const http = require('http');
const path = require('path');
const login = require('./routes/login');
const user = require('./lib/middleware/user');
const entries = require('./routes/entries');
const validate = require('./lib/middleware/validate');
const Entry = require('./lib/entry');
const page = require('./lib/middleware/page');
const api = require('./routes/api');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',api.auth);
app.use(user);
app.use(message);
app.use(app.router);
app.use(routes.notFound);
app.use(routes.error);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/**
 * 路由接口
 */
app.get('/post',entries.form);
app.post('/post',validate.required('entry[title]'),
                 validate.lengthAbove('entry[title]',4),
                 entries.submit);
app.get('/register',register.form);
app.post('/register',register.submit);
app.get('/login',login.form);
app.post('/login',login.submit);
app.get('/logout',login.logout);
app.get('/:page?', page(Entry.count,5), entries.list);
app.get('/api/user/:id',api.user);
app.post('/api/entry',entries.submit);
app.get('/api/entries/:page?',page(Entry.count),api.entries);

/**
 * 制造错误
 */

console.log(process.env.ERROR_ROUTE);
if (process.env.ERROR_ROUTE) {
    app.get('/dev/error',function (req, res, next) {
        var err = new Error('faild');
        err.type = 'database';
        next(err);
    })
}


/**
 * 启动服务
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
