/**
 * Created by slipkinem on 2016/11/15.
 */
/**
 * 404
 * @param req
 * @param res
 */
exports.notFound = function (req, res) {
    res.status(404).format({
        html:function () {
            res.render('404');
        },
        json:function () {
            res.send({message:'not found'});
        },
        xml:function () {
            res.write('<error>\n');
            res.write('<message>not found</message>\n')
            res.write('</error>\n');
        },
        text:function () {
            res.send('not found\n');
        }
    })
};
/**
 * error
 * @param err
 * @param req
 * @param res
 * @param next
 */
exports.error = function (err, req, res, next) {
    console.error(err.stack);
    var msg;

    switch (err.type) {
        case 'database':
            msg = 'Server Error';
            res.statusCode = 503;
            break;
        default:
            msg = 'Internal Server Error';
            res.statusCode = 500;
    }

    res.format({
        html:function () {
            res.render('5xx',{msg:msg,statusCode:res.statusCode});
        },
        json:function () {
            res.send({error:msg});
        },
        text:function () {
            res.send(msg + '\n');
        }
    })
};