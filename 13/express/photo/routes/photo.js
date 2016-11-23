/**
 * Created by slipkinem on 2016/11/14.
 */
const Photo = require('../modules/Photo');
const path = require('path');
const fs = require('fs');

const join = path.join;



// var photos = [];
//
// photos.push({
//     name:'lvsen',
//     path:'http://www.w3school.com.cn/i/eg_mouse.jpg'
// });
//
// photos.push({
//     name:'text',
//     path:'http://www.w3school.com.cn/i/eg_mouse.jpg'
// });




/**
 * render()的第一个参数是资源的位置
 * @param request
 * @param response
 */
exports.list = function (request, response, next) {
    Photo.find({},function (err, photos) {
        if (err) return next(err);

        response.render('photos',{
            title:'Photos',
            photos:photos
        });
    });
};
/**
 * upload表单
 * @param request
 * @param response
 */
exports.form = function (request, response) {
    response.render('photos/upload',{
        title:'Photo Upload'
    });
};
/**
 * 提交按钮
 * @param dir
 * @returns {Function}
 */
exports.submit = dir => (req, res, next) => {
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var path = join(dir+'',img.name);

        fs.rename(img.path,path,function (err) {  //重命名文件
            if (err) return next(err);

            //create({},nextFn);
            Photo.create({
                name:name,
                path:img.name
            },function (err) {
                if (err) return next(err);

                res.redirect('/');   //如果发生错误，则跳转到首页
            })
        })
    };

/**
 * 下载文件
 * @param dir
 * @returns {Function}
 */
exports.download = dir =>
    function (request, response, next) {
        var id = request.params.id;

        Photo.findById(id,function (err, photo) {
            if (err) return next(err);

            var path = join(dir,photo.path);
            response.download(path,photo.name+'.jpeg'); //自定义文件名字
        })
    };