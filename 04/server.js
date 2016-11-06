/**
 * Created by slipkinem on 2016/11/4.
 * 监测watch文件夹文件变动，将文件名变为小写，并输入done目录中
 */

/**
 * 创建Watcher构造器
 * @param watchDir
 * @param processedDir
 * @constructor
 */
function Watcher(watchDir,processedDir) {

    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var events = require('events');
var util   = require('util');

util.inherits(Watcher,events.EventEmitter); //对象继承


var fs         = require('fs');
var watchDir   = './watch';
var processedDir = './done';

Watcher.prototype.watched = function () {
    var watcher = this;
    //读取文件夹里的所有文件
    fs.readdir(this.watchDir,function (err, file) {
        if (err) throw err;
        /**
         * 读取每一个文件，发射process事件
         */
        for (var index in file){
            watcher.emit('process',file[index]);
        }
    })
};
//创建开始方法
Watcher.prototype.start = function () {
    var watcher = this;
    //监测watchDir内的文件变动，变动时执行watched方法；
    fs.watchFile(watchDir,function () {
        watcher.watched();
    })
};
/**
 * 创建watcher对象
 * @type {Watcher}
 */
var watcher = new Watcher(watchDir,processedDir);
/**
 * 绑定process事件，当process事件被发射时执行的任务
 */
watcher.on('process',function (file) {
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();
    /**
     * 重命名文件
     */
    fs.rename(watchFile,processedFile,function (err) {
        if (err) throw err;

    });
});

watcher.start();