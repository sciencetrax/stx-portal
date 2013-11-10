(function () {
	"use strict";

	angular.module('stx', [
			'ngResource',
			'ngCookies',
			'ngSanitize',
			'ui.router',
			'templates-app',
			'templates-common',
			'stx.about',
			'stx.accounts',
			'stx.common',
			'stx.core',
			'stx.encounters',
			'stx.home',
			'stx.login',
			'stx.reports',
			'stx.variablegroups'
		])
		.config(['$httpProvider', '$urlRouterProvider', 'WebServiceConfigProvider',
			function ($httpProvider, $urlRouterProvider, WebServiceConfigProvider) {
				$httpProvider.interceptors.push('SecurityResponseErrorInterceptor');
				$httpProvider.interceptors.push('errorInterceptor');
				$urlRouterProvider
					.when('', '/')
					.when('/', '/accounts/login')
					.when('/about', '/about/index')
					.when('/accounts', '/accounts/view')
					.when('/enroll', '/accounts/enroll')
					.when('/forgot', '/accounts/forgot')
					.when('/home', '/home/index')
					.when('/login', '/accounts/login')
					.when('/register', '/accounts/register')
					.when('/subjectLogin', '/login/subjectLogin')
				;
				WebServiceConfigProvider.configure(APPLICATION_PATH, "api/");
			}]
		)
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				.state('anonymous', {
					url: '/anonymous',
					data: {
						depends: [
							'portalResolver'
						]
					},
					views: {
						'menu': { templateUrl: 'common/menu/anonymous-menu.tpl.html' },
						'content': {
							templateUrl: 'anonymous.tpl.html',
							controller: 'AccountsEnrollController'
						}
					}
				})
				.state('finished', {
					url: '/finished',
					data: {
						depends: [
							'portalResolver'
						]
					},
					views: {
						'menu': { templateUrl: 'common/menu/anonymous-menu.tpl.html' },
						'content': {
							templateUrl: 'finished.tpl.html',
							controller: 'FinishedController'
						}
					}
				})
			;
		}])
		.factory('SecurityResponseErrorInterceptor',
			['$q', '$rootScope',
				function ($q, $rootScope) {
					return {
						responseError: function (rejection) {
							$rootScope.$broadcast('httpError', rejection);
							return $q.reject(rejection);
						}
					};
				}])
		.factory('errorInterceptor',
			['$q', '$rootScope', '$location',
				function ($q, $rootScope, $location) {
					return {
						response: function (response) {
							$rootScope.error = null;
							$rootScope.success = null;
							return response || $q.when(response);
						},
						responseError: function (rejection) {
							$(window).scrollTop(0);
							var error = rejection.data;
							if (error.errorCode != null) {
								$rootScope.error = {
									code: error.errorCode,
									message: LS.errorMessages.get(error.errorCode)
								};
								if ($('#errors').length === 0) {
									bootbox.alert($rootScope.error.message);
								}
							} else if (!String.isNullEmptyOrUndefined(error)) {
								bootbox.alert(error);
							} else {
								if (rejection.status == 401) {
									$location.path("/login");
									return $q.reject(rejection);
								}
								bootbox.alert("An HTTP error occurred.  Status: " + rejection.status);
							}
							return $q.reject(rejection);
						}
					};
				}])
	;
}());


