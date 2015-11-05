'use strict';

angular.module('peonApp')
    .controller('AdminSatuanEditCtrl', function ($scope, Restangular, $stateParams, $state, $alert, $aside) {

        function getSatuan() {
            Restangular.one('satuans').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
            });
        }
        getSatuan();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('satuans').customPUT($scope.data, $stateParams.id).then(function () {
                    $state.go('admin.satuan');
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
                templateUrl: 'app/admin/satuan/delete/delete.html'
            });
            deleteAside.$promise.then(function () {
                deleteAside.show();
            });
        };

    });