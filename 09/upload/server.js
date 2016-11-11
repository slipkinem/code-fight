/**
 * Created by slipkinem on 2016/11/10.
 */
const http = require('http');
const formidable = require('formidable');

const server = http.createServer(function (request, response) {
    switch (request.method) {
        case 'GET':
            show(request,response);
            break;
        case 'POST':
            upload(request,response);
            break;
        default:
    }
});

function show(request, response) {
    var html =  '<form method="post" action="/" enctype="multipart/form-data">' +
                '<p><input type="text" name="name"></p>' +
                '<p><input type="file" name="file"></p>' +
                '<p><input type="submit" value="upload"></p></form>'
    response.setHeader('Content-Type','text/html');
    response.setHeader('Content-Length',Buffer.byteLength(html));
    response.end(html);
}

function isFormData(request) {
    var type = request.headers['content-type'] || '';

    return 0 == type.indexOf('multipart/form-data');
}

function upload(request,response) {
    if (!isFormData(request)){
        response.statusCode = 400;
        response.end('bad request');
        return;
    }
    var form = new formidable.IncomingForm();

    //文件上传进度
    form.on('progress',function (bytesReceived, bytesExpected) {
        var percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log(percent);
    });

    // form.on('filed',function (filed, name) {
    //     console.log(filed,name);
    // });
    //
    // form.on('file',function (file, name) {
    //     console.log(file,name);
    // });
    //
    // form.on('end',function () {
    //     response.end('上传完成');  //response.write('上传完成'); response.end();
    // });
    // form.parse(request);

    /**
     * 简写
     */
    form.uploadDir = __dirname + '/tmp';
    form.parse(request,function (err, fileds, file) {
        if (err) throw err;
        console.log(fileds);
        console.log(file);
        response.end('complete');
    });
}

server.listen(3000,function () {
    console.log('server start')
});