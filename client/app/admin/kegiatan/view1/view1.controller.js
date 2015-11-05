'use strict';

angular.module('peonApp')
    .controller('AdminKegiatanView1Ctrl', function ($scope, Restangular, socket, $alert, blockUI, $timeout) {

        var block = blockUI.instances.get('block');

        $scope.getProgram = function () {
            block.start();
            Restangular.all('programs').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.datas = datas;
                    $scope.nodata = $scope.datas.length < 1;

                    socket.syncUpdates('program', datas, function (event, item, array) {
                        $scope.datas = array;
                        $scope.nodata = $scope.datas.length < 1;
                    });
                    block.stop();
                }, 1000);
            });
        };
        $scope.getProgram();

    });