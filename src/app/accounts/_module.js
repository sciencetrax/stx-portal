(function () {
	"use strict";

	angular.module('stx.accounts', [
			'ui.router',
			'ui.validate',
			'stx.core'
		])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				.state('accounts', {
					abstract: true,
					url: '/accounts',
					data: {
						depends: [
							'portalResolver'
						]
					},
					views: {
						'menu': { templateUrl: 'common/menu/secure-menu.tpl.html' },
						'content': { template: '<div ui-view></div>' }
					}
				})
				.state('accounts.emailAddressVerified', {
					url: '/emailAddressVerified',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsEmailAddressVerifiedController',
							templateUrl: 'accounts/emailAddressVerified.tpl.html',
							data: { pageTitle: 'Register' }
						}
					}
				})
				.state('accounts.enroll', {
					url: '/enroll',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsEnrollController',
							templateUrl: 'accounts/enroll.tpl.html',
							data: { pageTitle: 'Enroll' }
						}
					}
				})
				.state('accounts.register', {
					url: '/register',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsRegisterController',
							templateUrl: 'accounts/register.tpl.html',
							data: { pageTitle: 'Register' }
						}
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
					data: {
						pageTitle: 'Account Update',
						depends: [
							'authorizationContextResolver'
						]
					}
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


