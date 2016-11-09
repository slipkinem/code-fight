/**
 * Created by slipkinem on 2016/11/9.
 */

var http = require('http');

var server = http.createServer(function (request, response) {
    var url = '//baidu.com';
    var body = '<p>to <a href="'+url+'">'+url+'</a></p>';

    response.setHeader('Location',url);
    response.setHeader('Content-Length',body.length);
    response.setHeader('Content-Type','text/html');
    response.statusCode = 302;
    response.end(body);
});

server.listen(3000,function (err) {
    if (err) throw err;
    console.log('server is start ');
});