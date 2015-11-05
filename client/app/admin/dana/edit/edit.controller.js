'use strict';

angular.module('peonApp')
    .controller('AdminDanaEditCtrl', function ($scope, Restangular, $stateParams, $state, $alert, $aside) {

        function getDana() {
            Restangular.one('danas').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
            });
        }
        getDana();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('danas').customPUT($scope.data, $stateParams.id).then(function () {
                    $state.go('admin.dana');
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
                templateUrl: 'app/admin/dana/delete/delete.html'
            });
            deleteAside.$promise.then(function () {
                deleteAside.show();
            });
        };

    });