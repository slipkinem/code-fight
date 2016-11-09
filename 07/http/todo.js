/**
 * Created by slipkinem on 2016/11/9.
 */
const http = require('http');
const url = require('url');
var items = [];

var server = http.createServer(function (request, response) {

    switch (request.method){
        case 'POST':
            var item = '';
            request.setEncoding('utf8');
            request.on('data',function (err, chunk) {
                if (err) throw err;
                item += chunk;
            });
            request.on('end',function () {
                items.push(item);
                request.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach(function (item, i) {
                response.write(i + ') ' + item + '\n');
            });
            response.end();
            break;
    }

});

server.listen(3000,function () {
    console.log('start');
});