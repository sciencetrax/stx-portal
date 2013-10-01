(function () {
    "use strict";

    angular.module('stx.accounts', [
            'stx.accounts.update'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('accounts', {
                    abstract: true,
                    url: '/accounts',
                    views: {
                        'menu': { templateUrl: 'common/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
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


