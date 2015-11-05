'use strict';

angular.module('peonApp')
    .controller('AdminProgramViewCtrl', function ($scope, Restangular, $alert, blockUI, $timeout) {

        $scope.tooltip = {
            'title': 'Jika di-checklist maka Program akan ditampilkan pada opsi Kabupaten / Kota'
        };

        $scope.data = {
            tampilkan: false
        };

        var block = blockUI.instances.get('block');

        $scope.getProgram = function () {
            block.start();
            Restangular.all('programs').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.datas = datas;
                    $scope.nodata = $scope.datas.length < 1;
                    block.stop();
                }, 1000);
            });
        };
        $scope.getProgram();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('programs').customPOST({
                        k1: '2',
                        k2: '01',
                        k3: '01',
                        k4: $scope.data.k4,
                        uraian: $scope.data.uraian,
                        indikator: $scope.data.indikator,
                        tampilkan: $scope.data.tampilkan
                    }).then(function () {
                        $alert({
                            content: 'Data berhasil disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        $scope.getProgram();
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
            socket.unsyncUpdates('program');
        });

    });