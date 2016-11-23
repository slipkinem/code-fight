/**
 * Created by slipkinem on 2016/11/23.
 */
'use strict';

require.config({
    /**
     * 配置依赖项文件路径
     */
    //baseUrl:'vendor',// 配置require全局文件目录，提取公共目录
    //baseUrl 会使你的整个require配置文件目录都改变，导致不是vendor下的文件路径错误
    paths: {
       angular: 'vendor/angular/angular',
       angularRoute: 'vendor/angular-route/angular-route',
       text: 'vendor/text/text',
       underscore: 'vendor/underscore/underscore'
    },
    /**
     * 配置不兼容的模块，exports出该模块正常使用的变量名；比如 jquery 的 jquery变量
     * 也可以配置其他文件类型,但须下载对应的包如require-css；css/json等 如：
     * bootstrap: {
            deps: [
                'jquery',
                'css!../../bootstrap.min.css'
            ]
        },
     */
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular']
    },
    //定义的angular具有优先权
    priority: ['angular']

});

// 启动angular程序，其中 angular为定义模块，app是依赖的app.js
require(['angular','app'],function (angular, app) {
    angular.element().ready(function () {
        angular.bootstrap(document,['app']);
    })
});