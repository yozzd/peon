'use strict';

angular.module('peonApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('dinas', {
                url: '/d',
                views: {
                    '@': {
                        templateUrl: 'app/dinas/home/home.html',
                        controller: 'DinasHomeCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('dinas.entry', {
                url: '/entry',
                views: {
                    '@': {
                        templateUrl: 'app/dinas/entry/view/view.html',
                        controller: 'DinasEntryViewCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Entry Proposal'
                }
            })
            .state('dinas.daftar', {
                url: '/daftar',
                views: {
                    '@': {
                        templateUrl: 'app/dinas/daftar/view/view.html',
                        controller: 'DinasDaftarViewCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Proposal'
                }
            })
            .state('dinas.daftar.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/dinas/daftar/edit/edit.html',
                        controller: 'DinasDaftarEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Proposal'
                }
            });
    });