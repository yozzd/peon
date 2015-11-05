'use strict';

angular.module('peonApp')
    .controller('AdminSatuanDeleteCtrl', function ($scope, Restangular, $state, $alert) {

        $scope.delete = function (id) {
            Restangular.one('satuans').customDELETE(id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $state.go('admin.satuan');
                $scope.$hide();
            });
        };

    });