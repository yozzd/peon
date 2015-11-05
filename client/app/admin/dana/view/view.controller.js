'use strict';

angular.module('peonApp')
    .controller('AdminDanaViewCtrl', function ($scope, Restangular, $alert, blockUI, $timeout) {
        var block = blockUI.instances.get('block');

        $scope.getDana = function () {
            block.start();
            Restangular.all('danas').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.datas = datas;
                    $scope.nodata = $scope.datas.length < 1;
                    block.stop();
                }, 1000);
            });
        };
        $scope.getDana();

        $scope.predicate = 'dana';

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('danas').customPOST({
                        dana: $scope.data.dana
                    }).then(function () {
                        $alert({
                            content: 'Data berhasil disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        $scope.getDana();
                    })
                    .catch(function (err) {
                        $alert({
                            title: 'Error!',
                            content: err.data,
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                    });
            }
        };


        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('dana');
        });

    });