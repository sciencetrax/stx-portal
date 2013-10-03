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
		'stx.variablegroups'
	])
	.factory('SecurityResponseErrorInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
		return {
			responseError: function (rejection) {
				$rootScope.$broadcast('httpError', rejection);
				return $q.reject(rejection);
			}
		};
	}])
	.config(['$httpProvider', '$urlRouterProvider', 'WebServiceConfigProvider',
		function ($httpProvider, $urlRouterProvider, WebServiceConfigProvider) {
			$httpProvider.interceptors.push('SecurityResponseErrorInterceptor');
			$urlRouterProvider
				.when('/', '/home/index/summary')
				.when('/forgot', '/login/forgot')
				.when('/home', '/home/index/summary')
				.when('/login', '/login/login')
				.when('/register', '/login/register')
				.when('/subjectLogin', '/login/subjectLogin')
				.otherwise('/');
			WebServiceConfigProvider.configure('/StudyTrax', "api/");
		}])
	.controller('ApplicationController', ['$scope', '$window', '$location', '$state', '$stateParams', '$navigation', 'SecurityService',
		function ($scope, $window, $location, $state, $stateParams, $navigation, SecurityService) {
			function getTargetLocation() {
				var targetLocation = $location.path();
				if (targetLocation == "/login/login"
					|| targetLocation == "/login") {
					SecurityService.removeAuthorization();
					targetLocation = "/home/index/summary";
				}
				if (targetLocation == "/common/waiting") {
					targetLocation = "/home/index/summary";
				}
				return targetLocation;
			}

			$scope.resendVerificationEmail = function () {
				$scope.error = null;
				$scope.successMessage = this.LS.common.verificationEmailSent;
			};
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

			if (targetLocation == '/login/register'
				|| targetLocation == '/login/forgot') {
				SecurityService.removeAuthorization();
			} else {
				SecurityService.handleAuthentication();
			}
			$scope.LS = LS;
		}])

;