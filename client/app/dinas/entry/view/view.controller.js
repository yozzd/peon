'use strict';

angular.module('peonApp')
    .controller('DinasEntryViewCtrl', function ($scope, Auth, Restangular, $alert, blockUI, $timeout) {

        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.getProgram = function () {
            Restangular.all('programs/query1').customGETLIST().then(function (datas) {
                $scope.programs = datas;
            });
        };
        $scope.getProgram();

        var block = blockUI.instances.get('block');
        var tahun = moment().add(1, 'years').format('YYYY');

        $scope.getProposal = function () {
            block.start();
            Restangular.all('sprograms').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.datas = [];
                    var filter = _.filter(datas, function (value) {
                        return value.pelaksana === $scope.getCurrentUser().name && value.tahun === tahun;
                    });
                    _.each(filter, function (value1, key) {
                        var anggaran = [];
                        _.each(value1._skegiatan, function (value2) {
                            anggaran.push(value2.jumlah);
                        });
                        $scope.datas[key] = {
                            id: value1._id,
                            no: value1.no,
                            skpd: value1.skpd,
                            anggaran: _.sum(anggaran)
                        };
                    });
                    $scope.nodata = $scope.datas.length < 1;
                    block.stop();
                }, 1000);
            });
        };
        $scope.getProposal();

        /*$scope.arr = [{
            program: ''
        }];

        $scope.tambah = function () {
            $scope.arr.push({
                program: ''
            });
        };*/

        $scope.program = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('sprograms').customPOST({
                        program: $scope.program.selected
                    }).then(function () {
                        $alert({
                            content: 'Data berhasil disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        $scope.getProposal();
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

    });