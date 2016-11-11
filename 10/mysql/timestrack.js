/**
 * Created by slipkinem on 2016/11/11.
 */

const qs = require('querystring');

/**
 * 返回html
 * @param response
 * @param html
 */
exports.sendHtml = function (response, html) {
    response.setHeader('Content-Type','text/html');
    response.setHeader('Content-Length',Buffer.byteLength(html));
    response.end(html);
};
/**
 * 解析http请求
 * @param request
 * @param callback
 */
exports.parseReceivedData = function (request, callback) {
    var body = '';
    request.setEncoding('utf8');
    request.on('data',function (chunk) {
        body += chunk;
    });
    request.on('end',function () {
        var data = qs.parse(body);
        callback(data);
    })
};
/**
 * html表单
 * @param id
 * @param path
 * @param label
 */
exports.actionForm = function (id, path, label) {
    return  `<form method="post" action="${path}">
                <input type="hidden" name="id" value="${id}">
                <input type="submit" value="${label}">    
             </form>`;
};
/**
 * 添加信息
 * @param db
 * @param request
 * @param response
 */
exports.add = function (db, request, response) {
    exports.parseReceivedData(request,function (work) {
        db.query(
            "INSERT INTO work (hours, date, description) " +
            " VALUES(?, ?, ?)",
            [work.hours,work.date,work.description],
            function (err) {
                if (err) throw err;
                exports.show(db,response);
            }
        )
    })
};
/**
 * 删除数据
 * @param db
 * @param request
 * @param response
 */
exports.delete = function (db, request, response) {
    exports.parseReceivedData(request,function (work) {
        db.query(
            "DELETE FROM work WHERE id=?",
            [work.id],
            function (err) {
                if (err) throw err;
                exports.show(db,response);
            }
        )
    })
};
/**
 * 归档一条记录(更新)
 * @param db
 * @param request
 * @param response
 */
exports.archive = function (db, request, response) {
    exports.parseReceivedData(request,function (work) {
        db.query(
            "UPDATE work SET archived=1 WHERE id=? ",
            [work.id],
            function (err) {
                if (err) throw err;
                exports.show(db,response);
            }
        )
    })
};
/**
 * 获取工作记录
 * @param db
 * @param response
 * @param showArchived
 */
exports.show = function (db, response, showArchived) {
    var query = "SELECT * FROM work WHERE archived=? ORDER BY date DESC";
    var archiveValue = (showArchived) ? 1 : 0;

    db.query(
        query,
        [archiveValue],
        function (err, rows) {
            var html = (showArchived) ? '' : `<a href="/archived">Archived work</a><br/>`;
            html += exports.workHitListHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(response,html);
        }
    );
};
/**
 * 显示归档记录
 * @param db
 * @param response
 */
exports.showArchived = function (db, response) {
    exports.show(db, response);
};
/**
 * 渲染模板
 * @param rows
 */
exports.workHitListHtml = function(rows){
    var html = '<table>';
    for (var index in rows) {
        html += '<tr>';
        html += '<td>' + rows[index].date + '</td>';
        html += '<td>' + rows[index].hours + '</td>';
        html += '<td>' + rows[index].description + '</td>';
        if (!rows[index].archived){
            html += '<td>' + exports.workArchiveForm(rows[index].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[index].id) + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;
};
/**
 * 输入新工作记录的html
 */
exports.workFormHtml = function () {
    return  `<form method="post" action="/">
                <p>Data (YYYY-MM-DD):<br/><input type="text" name="data"></p>
                <p>Hours worked:<br/><input type="text" name="hours"></p>
                <p>Description:<br/></p>
                <textarea name="description" cols="30" rows="10"></textarea>
                <input type="submit" value="add">
             </form>`;
};
/**
 * 渲染归档按钮表单
 * @param id
 */
exports.workArchiveForm = function (id) {
    return exports.actionForm(id,'/archive','Archive');
};
/**
 * 渲染删除按钮表单
 * @param id
 */
exports.workDeleteForm = function (id) {
    return exports.actionForm(id,'/delete','Delete');
};