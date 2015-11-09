'use strict';

angular.module('peonApp')
    .controller('SidebarCtrl', function ($scope, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.admin = {
            home: [{
                label: 'Home',
                state: 'admin'
            }],
            settings: [{
                label: 'Profil',
                state: 'admin.profil'
            }, {
                label: 'Satuan',
                state: 'admin.satuan'
            }, {
                label: 'Sumber Dana',
                state: 'admin.dana'
            }],
            main: [{
                label: 'Program',
                state: 'admin.program'
            }, {
                label: 'Kegiatan',
                state: 'admin.kegiatan'
            }, {
                label: 'Daftar Program / Kegiatan',
                state: 'admin.daftar'
            }]
        };

    });