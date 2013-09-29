(function () {
    "use strict";

    angular.module('stx.accounts.update', [
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('accounts', {
                    abstract: true,
                    url: '/accounts',
                    template: '<div ui-view></div>'
                })
                .state('accounts.update', {
                    url: '/accounts/update',
                    controller: 'accounts.update.controller',
                    templateUrl: 'accounts/update.tpl.html',
                    data: { pageTitle: 'Account Update' }
                })
            ;
        }])
        .controller('AccountUpdateController', function () {

        })
    ;
}());


