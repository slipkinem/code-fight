/**
 * Created by slipkinem on 2016/11/4.
 */

var http = require('http');
var fs = require('fs');


// http.createServer(function (request, response) {
//     if (request.url == '/'){
//
//         fs.readFile('./title.json',function (err, data) {
//             if(err){
//                 console.error(err);
//             }else {
//                 var titles = JSON.parse(data.toString());
//
//                 fs.readFile('./tempelate.html',function (err, data) {
//
//                     if (err){
//                         console.error(err);
//                         response.end('server error');
//                     }else {
//                         var tpl = data.toString();
//                         var html = tpl.replace('%',titles.join('<li></li>'));
//
//                         response.writeHead(200,{'Content-Type': 'text/html'});
//
//                         response.end(html);
//                     }
//                 })
//             }
//         })
//     }
// }).listen(3000,function () {
//     console.log('server start');
// });
var server = http.createServer(function (request, response) {
    if(request.url === '/'){
        readTitle(response);
    }
});

server.listen(3000,function () {
    console.log('server is start');
});


function readTitle(response) {
    fs.readFile('./title.json',function (err, data) {
        if (err) return hadError(err,response);
        readHtml(JSON.parse(data.toString()),response);
    })
}

function readHtml(titles,response) {
    fs.readFile('./tempelate.html',function (err, data) {

        if (err) return hadError(err,response);

        formatHtml(data.toString(),titles,response);
    })
}

function formatHtml(tpl,titles,response) {

    var html = tpl.replace('%',titles.join('<li></li>'));
    response.writeHead(200,{'Content-Type':'text/html'});

    response.end(html);
}

function hadError(err,response) {
    console.log(err);
    response.end('server error');
}