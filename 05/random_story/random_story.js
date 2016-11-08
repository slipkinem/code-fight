/**
 * Created by slipkinem on 2016/11/8.
 */

// 串化 流程控制
const fs = require('fs');
const request = require('request');
const htmlparder = require('htmlparser');
const configFileName = './rss_feeds.txt';

function checkForRSSFile() {
    fs.exists(configFileName,function (exists) {
        if (!exists){
            return next(new Error('error' + configFileName));
        }else {
            next(null,configFileName);
        }
    })
}

function readRSSFile(configFileName) {
    fs.readFile(configFileName,function (err, feedList) {
        if (err) return next(err);

        var feedList = feedList
                            .toString()
                            .replace(/^\s+|\s+$/g, '')
                            .split('\n');
        var random = Math.floor(Math.random()*feedList.length);
        next(null,feedList[random]);
    })
}

function downLoadRSSFeed(feedUrl) {
    request({url:feedUrl},function (err, resquest, responseBody) {
        if(err) next(err);
        if (resquest.statusCode != 200){
            return next(new Error('code is fail'));
        }else {
            next(null,responseBody);
        }
    });
}

function parserRSSFees(rss) {
    var handler = new htmlparder.RssHandler();
    var parser = new htmlparder.Parser(handler);
    parser.parseComplete(rss);

    if (!handler.dom.items.length){
        return next (new Error('no rss item found'));
    }

    var items = handler.dom.items;
    var itemsFuck = '';
    for (var index in items){
        console.log(items[index].link);
        console.log(items[index].title);
        itemsFuck += items[index].title + '\n' + items[index].link + '\n';
    }
    fs.writeFile('./write.txt',itemsFuck,function (err) {
        if (err) throw err;
    })
}

var tasks = [checkForRSSFile,readRSSFile,downLoadRSSFeed,parserRSSFees];

function next(err, result) {
    if (err) throw err;

    var currentTask = tasks.shift();

    if (currentTask){
        currentTask(result);
    }
}

next();