'use strict';

angular.module('peonApp')
    .directive('sidebar', function () {
        return {
            templateUrl: 'components/sidebar/sidebar.html',
            restrict: 'E',
            controller: 'SidebarCtrl'
        };
    });