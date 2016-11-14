
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var photos = require("./routes/photo");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); //提供public下的静态文件

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * 配置环境
 */
// var env = process.env.NODE_ENV || 'development';
//
//  app.set('views',__dirname + '/views');

//  app.set('view engine','ejs');
//  if ('development' == env) {
//  app.use(express.errorHandler());
//  }
// 等同于  configure 是个语法糖
app.configure(function () {
    app.set('views',__dirname + '/views');
    app.set('view engine','ejs');
    app.set('photos',__dirname + '/public/photos');  //上传图片路径
});

app.configure('development',function () {
    app.use(express.errorHandler());
});

/**
 * 制定程序路由
 */
console.log(app.get('photos'));
app.get('/', photos.list);
app.get('/users', user.list);
app.get('/upload',photos.form);
app.post('/upload',photos.submit(app.get('photos'))); //get的为set的photos
app.get('/photo/:id/download',photos.download(app.get('photos')));

/**
 * 启动服务器
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
