'use strict';

angular.module('peonApp')
    .controller('DinasDaftarViewCtrl', function ($scope, Restangular, blockUI, $timeout) {

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

    });