/**
 * Created by slipkinem on 2016/11/9.
 */

const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname; //该文件所在的目录；

const server = http.createServer(function (request, response) {
    var url = parse(request.url);
    var path = join(root,url.pathname);

    fs.stat(path,function (err,state) {
        if (err) {
            if ('ENOENT' == err.code) {
                response.statusCode = 404;
                response.end('not found');
            }else {
                response.statusCode = 500;
                response.end('server is error');
            }
        }else {
            response.setHeader('Content-Length',state.size);

            var stream = fs.createReadStream(path);
            stream.pipe(response);

            //写入流可能会出错
            stream.on('error',function () {
                response.statusCode = 500;
                response.end('server is error');
            });
            console.log(path);
        }
    });
    // stream.on('data',function (err, chunk) {
    //     if (err) throw err;
    //     response.write(chunk);
    // });
    // stream.on('end',function () {
    //     response.end();
    // });

});

server.listen(3000,function () {
    console.log('server is start');
});