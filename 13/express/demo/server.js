/**
 * Created by slipkinem on 2016/11/14.
 */

const express = require('express');

var app = express();

app.get('/',function (request, response) {
    response.send('hello');
});

app.listen(3000,function () {
    console.log('server started');
});