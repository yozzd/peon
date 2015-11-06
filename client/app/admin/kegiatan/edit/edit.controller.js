'use strict';

angular.module('peonApp')
    .controller('AdminKegiatanEditCtrl', function ($scope, Restangular, $stateParams, $state, $alert, $aside) {

        Restangular.one('programs').customGET($stateParams.pid).then(function (data) {
            $scope.program = data;
        });

        function getKegiatan() {
            Restangular.one('kegiatans').customGET($stateParams.kid).then(function (data) {
                $scope.data = data;

                $scope.satuan = {
                    selected: {
                        satuan: data.satuan
                    }
                };
                $scope.dana = {
                    selected: {
                        dana: data.dana
                    }
                };
                $scope.pelaksana = {
                    selected: data.pelaksana
                };
            });
        }
        getKegiatan();

        function getSatuan() {
            Restangular.all('satuans').customGETLIST().then(function (datas) {
                $scope.satuans = datas;
            });
        }
        getSatuan();

        function getDana() {
            Restangular.all('danas').customGETLIST().then(function (datas) {
                $scope.danas = datas;
            });
        }
        getDana();

        $scope.pelaksanas = ['Sekretariat', 'Bidang Tanaman Pangan', 'Bidang Hortikultura',
                             'Bidang PLA', 'Bidang Bina Usaha Tani', 'UPT PSBTPH', 'UPT PTPH',
                             'UPT BIH Gedung Johor dan Asam Kumbang', 'UPT BI Murni Tanjung Morawa',
                             'UPT Mekanisasi Pertanian', 'UPT PPSDMP', 'UPT BI Palawija Tanjung Selamat',
                             'UPT BIH Kutagadung', 'UPT BIH Arse Sipirok', 'UPT BI Tanaman Pangan dan Hortikultura Gabe Hutaraja',
                             'Asahan', 'Batubara', 'Dairi', 'Deli Serdang', 'Humbang Hasundutan', 'Karo', 'Labuhanbatu',
                             'Labuhanbatu Selatan', 'Labuhanbatu Utara', 'Langkat', 'Mandailing Natal', 'Nias', 'Nias Barat',
                             'Nias Selatan', 'Nias Utara', 'Padang Lawas', 'Padang Lawas Utara', 'Pakpak Bharat', 'Samosir',
                             'Serdang Bedagai', 'Simalungun', 'Tapanuli Selatan', 'Tapanuli Tengah', 'Tapanuli Utara', 'Toba Samosir',
                             'Binjai', 'Gunungsitoli', 'Medan', 'Padangsidempuan', 'Pematangsiantar', 'Sibolga', 'Tanjungbalai', 'Tebing Tinggi'];

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('kegiatans').customPUT({
                    k5: $scope.data.k5,
                    uraian: $scope.data.uraian,
                    indikator: $scope.data.indikator,
                    lokasi: $scope.data.lokasi,
                    sasaran: $scope.data.sasaran,
                    satuan: $scope.satuan.selected.satuan,
                    harga: $scope.data.harga,
                    dana: $scope.dana.selected.dana,
                    pelaksana: $scope.pelaksana.selected
                }, $stateParams.kid).then(function () {
                    $state.go('admin.kegiatan.view2', {
                        pid: $stateParams.pid
                    });
                    $alert({
                        content: 'Data berhasil diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

        $scope.delete = function () {
            var deleteAside = $aside({
                scope: $scope,
                templateUrl: 'app/admin/kegiatan/delete/delete.html'
            });
            deleteAside.$promise.then(function () {
                deleteAside.show();
            });
        };

    });