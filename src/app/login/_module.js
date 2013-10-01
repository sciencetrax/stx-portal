(function () {
    "use strict";

    angular.module('stx.login', [
            'stx.login.login',
            'stx.login.register'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('login', {
                    abstract: true,
                    url: '/login',
                    views: {
                        'menu':     { templateUrl: 'login/login-menu.tpl.html' },
                        'content':  { template: '<div ui-view></div>' }
                    }
                })
                .state('login.login', {
                    url: '/login',
                    controller: 'LoginController',
                    templateUrl: 'login/login.tpl.html',
                    data: { pageTitle: 'Login' }
                })
                .state('login.register', {
                    url: '/register',
                    controller: 'RegisterController',
                    templateUrl: 'login/register.tpl.html',
                    data: { pageTitle: 'Sign Up' }
                })
            ;
        }])
    ;
}());


