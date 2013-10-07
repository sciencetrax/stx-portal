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
                .state('accounts.resetPassword', {
					url: '/resetPassword/{token}',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsResetPasswordController',
							templateUrl: 'accounts/resetPassword.tpl.html',
							data: { pageTitle: 'Reset Password' }
						}
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


