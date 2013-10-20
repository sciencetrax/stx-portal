angular.module('stx', [
		'ngResource',
		'ngCookies',
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
		['$q', '$rootScope',
			function ($q, $rootScope) {
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
						} else if (error != null) {
							bootbox.alert(error);
						} else {
							bootbox.alert("An HTTP error occurred.  Status: " + rejection.status);
						}
						return $q.reject(rejection);
					}
				};
			}])
	.config(['$httpProvider', '$urlRouterProvider', 'WebServiceConfigProvider',
		function ($httpProvider, $urlRouterProvider, WebServiceConfigProvider) {
			$httpProvider.interceptors.push('SecurityResponseErrorInterceptor');
			$httpProvider.interceptors.push('errorInterceptor');
			$urlRouterProvider
				.when('', '/')
				.when('/', '/home/index/summary')
				.when('/accounts', '/accounts/view')
				.when('/enroll', '/accounts/enroll')
				.when('/forgot', '/login/forgot')
				.when('/home', '/home/index/summary')
				.when('/login', '/accounts/login')
				.when('/register', '/accounts/register')
				.when('/subjectLogin', '/login/subjectLogin')
//				.otherwise('/')
			;
			WebServiceConfigProvider.configure('/StudyTrax', "api/");
		}]
	)
	.controller('ApplicationController', ['$scope', '$window', '$location', '$state', '$stateParams', 'dependencyResolver', 'stateExt', '$navigation',
		function ($scope, $window, $location, $state, $stateParams, dependencyResolver, stateExt, $navigation) {
			$scope.safeApply = function (fn) {
				var phase = this.$root.$$phase;
				if (phase == '$apply' || phase == '$digest') {
					if (fn && (typeof(fn) === 'function')) {
						fn();
					}
				} else {
					$scope.$apply(fn);
				}
			};

			$scope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
				bootbox.alert("State Not Found:" + unfoundState.to);
			});
			$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				stateExt.onStateChangeStart(event, toState, toParams, fromState, fromParams);
				dependencyResolver.onStateChangeStart(event, toState, toParams, fromState, fromParams);
			});
			$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
					$scope.pageTitle = toState.data.pageTitle + ' | ' + LS.appName;
				}
			});
			$scope.$root.loaded = true;
//			$scope.$navigation = $navigation;
			$scope.$state = $state;
			$scope.$stateParams = $stateParams;
			$scope.LS = LS;
		}
	])
;