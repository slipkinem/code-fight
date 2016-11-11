/**
 * Created by slipkinem on 2016/11/11.
 */

const fs = require('fs');
const path = require('path');
const args = process.argv.splice(2);
const command = args.shift();
const taskDescription = args.join(' ');
const file = path.join(process.cwd(),'/.tasks');

//判断输入命令
switch (command) {
    case 'list':
        listTask(file);
        break;
    case 'add':
        addTask(file,taskDescription);
        break;
    default:
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription] ');
}

function loadOrInitializelizeTaskArray(file, callback) {
    fs.exists(file,function (exists) {
        var tasks = [];
        if (exists) {
            fs.readFile(file,'utf8',function (err, data) {
                if (err) throw err;
                var data = data.toString();
                var task = JSON.parse(data || '[]');
                callback(task);
            })
        }else {
            callback([]);
        }
    })
}

function listTask(file) {
    loadOrInitializelizeTaskArray(file,function (tasks) {
        for (var index in tasks) {
            console.log(tasks[index]);
        }
    });
}

function storeTasks(file,tasks) {
    fs.writeFile(file,JSON.stringify(tasks),'utf8',function (err) {
        if (err) throw err;
        console.log('saved');
    })
}

function addTask(file, taskDescription) {
    loadOrInitializelizeTaskArray(file,function (tasks) {
        tasks.push(taskDescription);
        storeTasks(file,tasks);
    })
}

