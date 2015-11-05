'use strict';

angular.module('peonApp')
    .directive('banner', function () {
        return {
            templateUrl: 'components/banner/banner.html',
            restrict: 'E'
        };
    });