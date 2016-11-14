/**
 * Created by slipkinem on 2016/11/14.
 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/slipkinem');

var schema = new mongoose.Schema({
    name:String,
    path:String
});

module.exports = mongoose.model('Photo',schema);