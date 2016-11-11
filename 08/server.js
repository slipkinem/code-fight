/**
 * Created by slipkinem on 2016/11/9.
 */

const http = require('http');
const fs = require('fs');
var items = ['第一件','第二件','第三件'];

http.createServer(function (request, response) {
    console.info(response);
    if ('/' == request.url){
        switch (request.method){
            case 'GET':
                show(response);
                break;
            case 'POST':
                add(request,response);
                break;
            default:
                badRequest(response);
        }
    }else {
        notFound(response);
    }
}).listen(3000,function () {
    console.info('server is start');
});

function show(response) {

    var html = '<html><head><meta charset="utf-8"><title>todoList</title></head>'+
                '<body><h1>todoList</h1><ul>'
                +items.map(function(item){   //map计算后会返回一个新数组，foreach只是循环做事
                    return '<li>'+ item + '</li>'
                }).join('')
                +'</ul><form action="/" method="post">'
                +'<p><input type="text" name="item"></p>'
                +'<p><input type="submit" value="add item"></p>'
                +'</form></body>';

    response.setHeader('Content-Type','text/html');
    response.setHeader('Content-Length',Buffer.byteLength(html));
    response.end(html);
}

function notFound(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type','text/plain');
    response.end('Not Found');
}

function badRequest(response) {

    response.statusCode = 400;
    response.setHeader('Content-Type','text/plain');
    response.end('bad requests');
}

const qs = require('querystring');

function add(request,response) {
    var body = '';
    request.setEncoding('utf8');
    request.on('data',function (chunk) {
        console.info(chunk);
        body += chunk;
    });
    request.on('end',function () {
        //qs.parse会将 item=%E7%AC%AC%E4%BA%94%E4%BB%B6，解析成 {'item':'原文字'}
        var obj = qs.parse(body);
        items.push(obj.item);
        show(response);
    })

}