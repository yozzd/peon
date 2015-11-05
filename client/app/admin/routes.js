'use strict';

angular.module('peonApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/a',
                views: {
                    '@': {
                        templateUrl: 'app/admin/home/home.html',
                        controller: 'AdminHomeCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('admin.profil', {
                url: '/profil',
                views: {
                    '@': {
                        templateUrl: 'app/admin/profil/view/view.html',
                        controller: 'AdminProfilViewCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Profil'
                }
            })
            .state('admin.profil.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/admin/profil/edit/edit.html',
                        controller: 'AdminProfilEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit'
                }
            })
            .state('admin.satuan', {
                url: '/satuan',
                views: {
                    '@': {
                        templateUrl: 'app/admin/satuan/view/view.html',
                        controller: 'AdminSatuanViewCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Satuan'
                }
            })
            .state('admin.satuan.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/admin/satuan/edit/edit.html',
                        controller: 'AdminSatuanEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit'
                }
            })
            .state('admin.dana', {
                url: '/dana',
                views: {
                    '@': {
                        templateUrl: 'app/admin/dana/view/view.html',
                        controller: 'AdminDanaViewCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Sumber Dana'
                }
            })
            .state('admin.dana.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/admin/dana/edit/edit.html',
                        controller: 'AdminDanaEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit'
                }
            })
            .state('admin.program', {
                url: '/program',
                views: {
                    '@': {
                        templateUrl: 'app/admin/program/view/view.html',
                        controller: 'AdminProgramViewCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Program'
                }
            })
            .state('admin.program.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/admin/program/edit/edit.html',
                        controller: 'AdminProgramEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit'
                }
            })
            .state('admin.kegiatan', {
                url: '/kegiatan',
                views: {
                    '@': {
                        templateUrl: 'app/admin/kegiatan/view1/view1.html',
                        controller: 'AdminKegiatanView1Ctrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pilih Program'
                }
            })
            .state('admin.kegiatan.view2', {
                url: '/view2/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/admin/kegiatan/view2/view2.html',
                        controller: 'AdminKegiatanView2Ctrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{program.uraian}}'
                }
            });
    });