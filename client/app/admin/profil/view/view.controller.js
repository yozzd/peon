'use strict';

angular.module('peonApp')
    .controller('AdminProfilViewCtrl', function ($scope, Auth, Restangular) {

        $scope.getCurrentUser = Auth.getCurrentUser;

        function getUser() {
            Restangular.one('users').customGET($scope.getCurrentUser()._id).then(function (data) {
                $scope.data = data._profil;
            });
        }
        getUser();

    });