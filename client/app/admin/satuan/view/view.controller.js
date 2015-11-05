'use strict';

angular.module('peonApp')
    .controller('AdminSatuanViewCtrl', function ($scope, Restangular, $alert, blockUI, $timeout) {

        var block = blockUI.instances.get('block');

        $scope.getSatuan = function () {
            block.start();
            Restangular.all('satuans').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.datas = datas;
                    $scope.nodata = $scope.datas.length < 1;
                    block.stop();
                }, 1000);
            });
        };
        $scope.getSatuan();

        $scope.predicate = 'satuan';

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('satuans').customPOST({
                        satuan: $scope.data.satuan
                    }).then(function () {
                        $alert({
                            content: 'Data berhasil disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        $scope.getSatuan();
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
            socket.unsyncUpdates('satuan');
        });

    });