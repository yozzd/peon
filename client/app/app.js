'use strict';

angular.module('peonApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'validation.match',
    'mgcrea.ngStrap',
    'ngAnimate',
    'permission',
    'restangular',
    'ncy-angular-breadcrumb',
    'blockUI',
    'ui.select'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider, blockUIConfig, uiSelectConfig) {
        $urlRouterProvider
            .otherwise('/login');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        //restangular config
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setDefaultHttpFields({
            cache: false
        });
        RestangularProvider.setRequestInterceptor(function (elem, operation) {
            if (operation === 'remove') {
                return undefined;
            }
            return elem;
        });

        //block-ui
        blockUIConfig.delay = 0;
        blockUIConfig.autoBlock = false;

        //ui-select config
        uiSelectConfig.theme = 'select2';
    })

.factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
    var state;
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookies.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookies.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
            if (response.status === 401) {
                (state || (state = $injector.get('$state'))).go('login');
                // remove any stale tokens
                $cookies.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function ($rootScope, $state, Auth, Permission, $q) {
    // Redirect to login if route requires auth and the user is not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if (next.authenticate) {
            Auth.isLoggedIn(function (loggedIn) {
                if (!loggedIn) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        }
    });

    //angular-permission
    Permission
        .defineRole('admin', function () {
            var deferred = $q.defer();
            Auth.getCurrentUser(function (data) {
                if (data.role === 'admin') {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        });
});