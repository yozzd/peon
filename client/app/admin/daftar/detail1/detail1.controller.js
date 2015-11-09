'use strict';

angular.module('peonApp')
    .controller('AdminDaftarDetail1Ctrl', function ($scope, Restangular, $stateParams, blockUI, $timeout) {

        var block = blockUI.instances.get('block2');

        function getProgram() {
            block.start();
            Restangular.one('programs').customGET($stateParams.id).then(function (data) {
                $timeout(function () {
                    $scope.data = data;
                    block.stop();
                }, 1000);
            });
        }
        getProgram();

    });