'use strict';

angular.module('peonApp')
    .controller('AdminDanaDeleteCtrl', function ($scope, Restangular, $state, $alert) {

        $scope.delete = function (id) {
            Restangular.one('danas').customDELETE(id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $state.go('admin.dana');
                $scope.$hide();
            });
        };

    });