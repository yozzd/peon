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
            });
    });