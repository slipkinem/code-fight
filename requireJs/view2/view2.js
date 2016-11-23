/**
 * Created by slipkinem on 2016/11/23.
 */
'use strict';

define(['angular','angularRoute'],

    function (angular, angularRoute) {

        angular.module('app.view2',['ngRoute'])

            .config(['$routeProvider',function ($routeProvider) {
                $routeProvider.when('/view2',{
                    templateUrl: 'view2/view2.html',
                    controller: 'View2Controller'
                })
            }])

            .controller('View2Controller',['$scope','$injector',function ($scope, $injector) {
                require(['view2/ctrl'], function (ctrl) {
                    $injector.invoke(ctrl, this, {'$scope': $scope})
                })
            }])
});