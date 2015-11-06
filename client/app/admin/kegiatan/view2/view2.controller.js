'use strict';

angular.module('peonApp')
    .controller('AdminKegiatanView2Ctrl', function ($scope, Restangular, $stateParams, blockUI, $timeout, $alert) {

        var block = blockUI.instances.get('block');

        $scope.getProgram = function () {
            block.start();
            Restangular.one('programs').customGET($stateParams.pid).then(function (data) {
                $scope.program = data;
                $timeout(function () {
                    $scope.results = data._kegiatan;
                    $scope.nodata = $scope.results.length < 1;
                    block.stop();
                }, 1000);
            });
        };
        $scope.getProgram();

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

        $scope.satuan = {};
        $scope.dana = {};

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
        $scope.pelaksana = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('kegiatans').customPOST({
                        k1: $scope.program.k1,
                        k2: $scope.program.k2,
                        k3: $scope.program.k3,
                        k4: $scope.program.k4,
                        k5: $scope.data.k5,
                        uraian: $scope.data.uraian,
                        indikator: $scope.data.indikator,
                        lokasi: $scope.data.lokasi,
                        sasaran: $scope.data.sasaran,
                        satuan: $scope.satuan.selected.satuan,
                        harga: $scope.data.harga,
                        dana: $scope.dana.selected.dana,
                        pelaksana: $scope.pelaksana.selected,
                        _program: $scope.program._id
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

    });