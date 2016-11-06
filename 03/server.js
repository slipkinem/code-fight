/**
 * Created by slipkinem on 2016/11/4.
 */
var events = require('events');
var net = require('net');

var channle = new events.EventEmitter();

channle.client = {};
channle.subscriptions = {};
/**
 * 绑定一个join事件
 */
channle.on('join',function (id, client) {
    this.client[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        if (id != senderId) {
            this.client[id].write(message);
        }
    };
    this.on('broadcast',this.subscriptions[id]);
});
/**
 * 监听leave事件
 */
channle.on('leave',function (id) {
    channle.removeListener('broadcast',this.subscriptions[id]);
    channle.emit('broadcast',id,id + 'has leave the chat.\n'); 
});

/***
 * 创建服务
 */
var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;

    client.on('connect', function () {
        channle.emit('join',id,client);
    });

    client.on('data',function (data) {
        data = data.toString();
        channle.emit('broadcast',id,data);
    });

    client.on('close',function () {
        channle.emit('leave',id);
    })
});

server.listen(3000,function () {
    console.log('server start on 3000');
});

