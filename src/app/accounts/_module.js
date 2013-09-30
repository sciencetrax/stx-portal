(function () {
    "use strict";

    angular.module('stx.accounts', [
            'stx.accounts.login',
            'stx.accounts.update'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('accounts', {
                    abstract: true,
                    url: '/accounts',
                    template: '<div ui-view></div>'
                })
                .state('accounts.login', {
                    url: '/login',
                    controller: 'LoginController',
                    templateUrl: 'accounts/login.tpl.html',
                    data: { pageTitle: 'Login' }
                })
                .state('accounts.update', {
                    url: '/update',
                    controller: 'accounts.update.controller',
                    templateUrl: 'accounts/update.tpl.html',
                    data: { pageTitle: 'Account Update' }
                })
            ;
        }])
    ;
}());


