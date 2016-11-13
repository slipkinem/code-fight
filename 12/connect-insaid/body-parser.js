/**
 * Created by slipkinem on 2016/11/13.
 */

const connect = require('connect');
const bodyParser = require('body-parser');

var app = connect();
app.use(bodyParser()).listen(3000);