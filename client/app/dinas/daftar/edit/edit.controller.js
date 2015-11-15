'use strict';

angular.module('peonApp')
    .controller('DinasDaftarEditCtrl', function ($scope, Restangular, $stateParams, $alert, $aside) {

        function getProgram() {
            Restangular.one('sprograms').customGET($stateParams.id).then(function (data) {
                $scope.program = data;
                $scope.anggaran = _.sum(_.map($scope.program._skegiatan, function (value) {
                    return value.jumlah;
                }));
            });
        }
        getProgram();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('sprograms').customPUT($scope.program, $stateParams.id).then(function () {
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
                templateUrl: 'app/dinas/daftar/delete/delete.html'
            });
            deleteAside.$promise.then(function () {
                deleteAside.show();
            });
        };

    });