'use strict';

angular.module('peonApp')
    .controller('LoginCtrl', function ($scope, Auth, $state) {
        $scope.user = {};
        $scope.errors = {};

        var d = new Date();
        $scope.year1 = parseInt(2015);
        $scope.year2 = d.getFullYear();

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function (data) {
                        $state.go(data.group);
                    })
                    .catch(function (err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

    });