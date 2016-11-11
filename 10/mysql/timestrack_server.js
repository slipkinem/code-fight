/**
 * Created by slipkinem on 2016/11/11.
 */

const http = require('http');
const mysql = require('mysql');
const work = require('./timestrack');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'slipkinem',
    password: 'ls123456',
    database: 'slipkinem'
});

var server = http.createServer(function (request, response) {
    switch (request.method) {
        case 'POST':
            switch (request.url) {
                case '/':
                    work.add(db,request,response);
                    break;
                case '/archive':
                    work.archive(db,request,response);
                    break;
                case '/delete':
                    work.delete(db,request,response);
                    break
            }
            break;
        case 'GET':
            switch (request.url) {
                case '/':
                    work.show(db,response);
                    break;
                case '/archived':
                    work.showArchived(db,response);
                    break;
            }
            break;
    }
});

db.query(
    "CREATE TABLE IF NOT EXISTS work ("
    + "id INT(10) NOT NULL AUTO_INCREMENT, "
    + "hours DECIMAL(5,2) DEFAULT 0, "
    + "date LONGTEXT, "
    + "archived INT(1) DEFAULT 0, "
    + "description LONGTEXT, "
    + "PRIMARY KEY(id))",
    function (err) {
        if (err) throw err;
        console.log('server started.....');
        server.listen(3000,'127.0.0.1');
    }
);