'use strict';

angular.module('peonApp')
    .controller('AdminProfilEditCtrl', function ($scope, Restangular, $stateParams, $state, $alert) {

        function getProfil() {
            Restangular.one('profils').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
            });
        }
        getProfil();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('profils').customPUT($scope.data, $stateParams.id).then(function () {
                    $state.go('admin.profil');
                    $alert({
                        content: 'Data berhasil diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

    });