/**
 * Created by slipkinem on 2016/11/18.
 */

const fs = require('fs');
const http = require('http');
const ejs = require('ejs');

function getBlogEntries() {
    var entries = [];

    var entriesContent = fs.readFileSync('./entry.text','utf8');
    entriesContent = entriesContent.split('---');
    console.log(entriesContent);

    entriesContent.map(function (entryContent) {
        var entry = {};

        var lines = entryContent.split('\n');
        console.log(lines);
        lines.map(function (line) {
            if (line.indexOf('title:') === 0) {
                entry.title = line.replace('title:','');
            } else if (line.indexOf('date:') === 0 ) {
                entry.date = line.replace('date:','');
            } else {
                entry.body = entry.body || '';
                entry.body += line;
            }
        });
        entries.push(entry);
    });
    return entries;
}

var entries = getBlogEntries();
console.info(entries);

var server = http.createServer(function (req, res) {

    var output = blogPages(entries);

    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(output);
});
server.listen(3000,function () {
    console.log('server started');
});
/**
 * 字符串
 */
// function blogPages(entries) {
//     console.log(entries);
//     var output = `<head>
//                     <meta charset="utf-8">
//                     <style>.entry-title{font-weight: bold}.entry-date{font-style: italic;}.entry-body{margin-bottom: 1em}</style>
//                 </head>
//                     <html>
//                     <body>`;
//         entries.map(function (entry) {
//             output += `<div class="entry-title">${entry.title}</div>
//                         <div class="entry-date">${entry.date}</div>
//                         <div class="entry-body">${entry.body}</div>
//                         `;
//         });
//
//         output +=  `</body>
//                     </html>`;
//         return output;
// }

var template = fs.readFileSync('./ejs/page.ejs','utf8');
/**
 * ejs
 * @param entries
 * @returns {String}
 */
function blogPages(entries) {
    console.log(entries);

    return ejs.render(template,{entries:entries});
}