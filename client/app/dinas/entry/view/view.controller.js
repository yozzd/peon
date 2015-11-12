'use strict';

angular.module('peonApp')
    .controller('DinasEntryViewCtrl', function ($scope, Auth, Restangular, $alert) {

        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.getProgram = function () {
            Restangular.all('programs/query1').customGETLIST().then(function (datas) {
                $scope.programs = datas;
            });
        };
        $scope.getProgram();

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