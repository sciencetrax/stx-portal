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
				.state('accounts.unlocked', {
					url: '/unlocked',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsUnlockedController',
							templateUrl: 'accounts/unlocked.tpl.html',
							data: { pageTitle: 'Account Unlocked' }
						}
					}
				})
				.state('accounts.changePassword', {
					url: '/changePassword',
					controller: 'AccountsChangePasswordController',
					templateUrl: 'accounts/changePassword.tpl.html',
					data: {
						pageTitle: 'ChangePassword',
						depends: [
							'authorizationContextResolver',
							'portalResolver'
						]
					}
				})
				.state('accounts.emailAddressVerified', {
					url: '/emailAddressVerified',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsEmailAddressVerifiedController',
							templateUrl: 'accounts/emailAddressVerified.tpl.html',
							data: { pageTitle: 'Email Address Verified' }
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
							data: {
								history: 'exclude',
								pageTitle: 'Enroll'
							}
						}
					}
				})
				.state('accounts.failedEnrollment', {
					url: '/failedEnrollment',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsFailedEnrollmentController',
							templateUrl: 'accounts/failedEnrollment.tpl.html',
							data: { pageTitle: LS.pages.accounts.failedEnrollment }
						}
					}
				})
				.state('accounts.forgot', {
					url: '/forgot',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'ForgotController',
							templateUrl: 'accounts/forgot.tpl.html',
							data: { pageTitle: LS.pages.login.forgot.heading }
						}
					}
				})
				.state('accounts.login', {
					url: '/login?byReferenceId&username&password',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'LoginController',
							templateUrl: 'accounts/login.tpl.html',
							data: { pageTitle: 'Login' }
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
				.state('accounts.setPasswordAfterVerify', {
					url: '/setPasswordAfterVerify/{token}',
					views: {
						'menu@': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'': {
							controller: 'AccountsSetPasswordAfterVerifyController',
							templateUrl: 'accounts/setPasswordAfterVerify.tpl.html',
							data: { pageTitle: 'Set Password' }
						}
					}
				})
				.state('accounts.update', {
					url: '/update',
					controller: 'AccountsUpdateController',
					templateUrl: 'accounts/update.tpl.html',
					data: {
						history: 'exclude',
						pageTitle: 'Account Update',
						depends: [
							'authorizationContextResolver',
							'portalResolver'
						]
					}
				})
				.state('accounts.view', {
					url: '/view',
					controller: 'AccountsViewController',
					templateUrl: 'accounts/view.tpl.html',
					data: {
						pageTitle: 'Account',
						depends: [
							'authorizationContextResolver',
							'portalResolver'
						]
					}
				})
			;
		}])
	;
}());


