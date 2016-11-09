const fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
const filesDir = './text';

function checkIfComplete() {
    completedTasks ++;
    if (completedTasks === tasks.length){
        for (var index in wordCounts){
            console.log(index + '：' + wordCounts[index]);
        }
    }
}

function countWordsInText(text) {
    var words = text
        .toString()
        .toLowerCase()
        .split(/\W+/)
        .sort();
    for (var index in words){
        var word = words[index];
        if (word){
            wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
        }
    }
}
//读取文件夹
fs.readdir(filesDir,function (err, files) {
    if (err) throw err;

    for (var index in files){
        var task = (function (file) {
            return function () {
                //读取文件
                fs.readFile(file,function (err, text) {
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir + '/' + files[index]);
        tasks.push(task);
    }
    for (var i in tasks) {
        tasks[i]();
    }
});