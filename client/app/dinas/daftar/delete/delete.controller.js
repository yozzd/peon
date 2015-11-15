'use strict';

angular.module('peonApp')
    .controller('DinasDaftarDeleteCtrl', function ($scope, Restangular, $stateParams, $state, $alert) {

        $scope.delete = function (id) {
            Restangular.one('sprograms').customDELETE(id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $state.go('dinas.daftar');
                $scope.$hide();
            });
        };

    });