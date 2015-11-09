'use strict';

angular.module('peonApp')
    .controller('AdminDaftarDetail2Ctrl', function ($scope, Restangular, $stateParams, blockUI, $timeout) {

        var block = blockUI.instances.get('block2');

        function getKegiatan() {
            block.start();
            Restangular.one('kegiatans').customGET($stateParams.id).then(function (data) {
                $timeout(function () {
                    $scope.data = data;
                    block.stop();
                }, 1000);
            });
        }
        getKegiatan();

    });