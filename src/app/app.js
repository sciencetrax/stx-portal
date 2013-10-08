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
					response: function(response) {
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
						} else {
							bootbox.alert(error.errorCode);
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
				.when('/', '/home/index/summary')
				.when('/accounts', '/accounts/view')
				.when('/forgot', '/login/forgot')
				.when('/home', '/home/index/summary')
				.when('/login', '/login/login')
				.when('/register', '/accounts/register')
				.when('/subjectLogin', '/login/subjectLogin')
//				.otherwise('/')
			;
			WebServiceConfigProvider.configure('/StudyTrax', "api/");
		}])
	.controller('ApplicationController', ['$scope', '$window', '$location', '$state', '$stateParams', '$navigation', 'EmailRequest', 'SecurityService',
		function ($scope, $window, $location, $state, $stateParams, $navigation, EmailRequest, SecurityService) {
			function getTargetLocation() {
				var targetLocation = $location.path();
				if (targetLocation.startsWith("/login")
					|| targetLocation.startsWith('/accounts/resetPassword')) {
					targetLocation = "/home/index/summary";
				}
				if (targetLocation == "/common/waiting") {
					targetLocation = "/home/index/summary";
				}
				return targetLocation;
			}

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
			$scope.$navigation = $navigation;
			$scope.$state = $state;
			$scope.$stateParams = $stateParams;
			$scope.$on('$stateNotFound',
				function (event, unfoundState, fromState, fromParams) {
					bootbox.alert("State Not Found:" + unfoundState.to);
				});
			var targetLocation = getTargetLocation();
			$scope.$on('httpError', function (event, message) {
				SecurityService.handleError(message.status, message.data);
			});
			$scope.$on('notAuthorized', function () {
				$location.path('/login/login');
			});
			$scope.$on('authorizationContextLoading', function () {
				$location.path('/common/waiting');
			});
			$scope.$on('authorizationContextReady', function () {
				$scope.authorizationContext = SecurityService.authorizationContext;
				$location.path(targetLocation).replace();
			});
			$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
					$scope.pageTitle = toState.data.pageTitle + ' | ' + LS.appName;
				}
			});

			var currentPath = $location.path();
			if (currentPath.startsWith('/login')
				|| currentPath.startsWith('/accounts/emailAddressVerified')
				|| currentPath.startsWith('/accounts/register')
				|| currentPath.startsWith('/accounts/resetPassword')) {
				SecurityService.removeAuthorization();
			} else {
				SecurityService.handleAuthentication();
			}
			$scope.LS = LS;
		}])

;