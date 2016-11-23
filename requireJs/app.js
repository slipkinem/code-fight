/**
 * Created by slipkinem on 2016/11/23.
 */
'use strict';

/**
 * define定义模块，一个模块可以看作一个要加载的脚本
 * 依赖项和里面函数参数对应
 */
define(['angular','angularRoute','view1/view1','view2/view2'],

    function (angular, angularRoute, view1, view2) {
        /**
         * 这里的angular也是让路由，服务，控制器模块化
         * 所以只是定义一个路由
         */
        return angular.module('app',
            ['ngRoute','app.view1','app.view2'])

            .config(['$routeProvider' ,function ($routeProvider) {
                $routeProvider.otherwise({redirectTo: '/view1'});
            }])
});