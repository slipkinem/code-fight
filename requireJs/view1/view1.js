/**
 * Created by slipkinem on 2016/11/23.
 */
'use strict';
define(['angular','angularRoute'],

    function (angular) {
        angular.module('app.view1',['ngRoute'])

            .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/view1',{
                    templateUrl: 'view1/view1.html',
                    controller: 'View1Controller'
                })
            }])

            .controller('View1Controller',['$scope', function ($scope) {
                $scope.text = 666;
            }])
    });