'use strict';

angular.module('peonApp')
    .controller('AdminProgramDeleteCtrl', function ($scope, Restangular, $stateParams, $state, $alert) {

        $scope.delete = function (id) {
            Restangular.one('programs').customDELETE(id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $state.go('admin.program');
                $scope.$hide();
            });
        };

    });