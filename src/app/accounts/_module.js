(function () {
    "use strict";

    angular.module('stx.accounts', [
			'ui.router',
			'stx.core'
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
                    controller: 'AccountsUpdateController',
                    templateUrl: 'accounts/update.tpl.html',
                    data: { pageTitle: 'Account Update' }
                })
				.state('accounts.view', {
					url: '/view',
					controller: 'AccountsViewController',
					templateUrl: 'accounts/view.tpl.html'
				})
            ;
        }])
    ;
}());


