'use strict';

angular.module('peonApp')
    .controller('NavbarCtrl', function ($scope, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;
    });