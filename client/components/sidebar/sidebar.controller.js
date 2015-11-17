'use strict';

angular.module('peonApp')
    .controller('SidebarCtrl', function ($scope, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.isDinas = Auth.isDinas;
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
            }, {
                label: 'Daftar Proposal',
                state: 'admin.proposal'
            }]
        };

        $scope.dinas = {
            home: [{
                label: 'Home',
                state: 'dinas'
            }],
            main: [{
                label: 'Entry Proposal',
                state: 'dinas.entry'
            }, {
                label: 'Daftar Proposal',
                state: 'dinas.daftar'
            }]
        };

    });