(function () {
	"use strict";

	angular.module('stx.login', [
			'stx.login.login'
		])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				.state('login', {
					abstract: true,
					url: '/login',
					views: {
						'menu': { templateUrl: 'common/menu/login-menu.tpl.html' },
						'content': { template: '<div ui-view></div>' }
					},
					data: {
						depends: [
							'portalResolver'
						]
					}
				})
				.state('login.emailSent', {
					url: '/emailSent/{type}',
					controller: 'EmailSentController',
					templateUrl: 'login/emailSent.tpl.html',
					data: { pageTitle: 'Confirm Email' }
				})
				.state('login.forgot', {
					url: '/forgot',
					controller: 'ForgotController',
					templateUrl: 'login/forgot.tpl.html',
					data: { pageTitle: LS.pages.login.forgot.heading }
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


