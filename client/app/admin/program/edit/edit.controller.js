'use strict';

angular.module('peonApp')
    .controller('AdminProgramEditCtrl', function ($scope, Restangular, $stateParams, $state, $alert, $aside) {

        function getProgram() {
            Restangular.one('programs').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
            });
        }
        getProgram();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('programs').customPUT($scope.data, $stateParams.id).then(function () {
                    $state.go('admin.program');
                    $alert({
                        content: 'Data berhasil diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

        $scope.delete = function () {
            var deleteAside = $aside({
                scope: $scope,
                templateUrl: 'app/admin/program/delete/delete.html'
            });
            deleteAside.$promise.then(function () {
                deleteAside.show();
            });
        };

    });