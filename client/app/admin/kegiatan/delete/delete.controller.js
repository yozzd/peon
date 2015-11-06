'use strict';

angular.module('peonApp')
    .controller('AdminKegiatanDeleteCtrl', function ($scope, Restangular, $stateParams, $state, $alert) {

        $scope.delete = function (id) {
            Restangular.one('kegiatans').customDELETE(id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $state.go('admin.kegiatan.view2', {
                    pid: $stateParams.pid
                });
                $scope.$hide();
            });
        };

    });