/**
 * Created by slipkinem on 2016/11/13.
 */

const http = require('http');

var request = http.request({
    method:'POST',
    port:3000,
    headers:{
        'Content-Type':'application/json'
    }
});

request.write('[');

var n = 3000;

while (n--){
    request.write('"foo",')
}

request.write('"bar"]');

request.end();