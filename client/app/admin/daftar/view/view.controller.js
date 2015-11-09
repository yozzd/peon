'use strict';

angular.module('peonApp')
    .controller('AdminDaftarViewCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        var block = blockUI.instances.get('block1');

        function getProgram() {
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
        }
        getProgram();

    });