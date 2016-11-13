/**
 * Created by slipkinem on 2016/11/12.
 */

function setup(format) {
    var regexp = /:(\w+)/g;

    return function (request, response, next) {
        var str = format.replace(regexp,function (match, property) {
            return request[property];
        });

        console.log(str);

        next();
    }
}

module.export = setup;