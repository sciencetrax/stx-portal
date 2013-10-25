var StudyTraxConfig = {
	datePattern: 'M/d/yyyy'
};

angular.module('stx')
	.controller('ApplicationController', ['$scope', '$window', '$location', '$state', '$stateParams', 'dependencyResolver', 'session', 'stateExt',
		function ($scope, $window, $location, $state, $stateParams, dependencyResolver, session, stateExt) {
			if (typeof(stx) != 'undefined') {
				stx.Constants.ApplicationPath = WEB_SERVICES_URL;
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

			$scope.$on('$stateChangeError ', function (event, toState, toParams, fromState, fromParams) {
				bootbox.alert("State Not Found:" + unfoundState.to);
			});
			$scope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
				bootbox.alert("State Not Found:" + unfoundState.to);
			});
			$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				stateExt.onStateChangeStart(event, toState, toParams, fromState, fromParams);
				dependencyResolver.onStateChangeStart(event, toState, toParams, fromState, fromParams);
			});
			$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				stateExt.onStateChangeSuccess(event, toState, toParams, fromState, fromParams);
				if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
					$scope.pageTitle = toState.data.pageTitle + ' | ' + LS.appName;
				}
			});

			$scope.$root.session = session;
			$scope.$root.loaded = true;
			$scope.$state = $state;
			$scope.$stateParams = $stateParams;
			$scope.stateExt = stateExt;
			$scope.LS = LS;

			$scope.$root.$on("sessionExpirationWarning", function() {
				$('#sessionExpirationDialog').modal('show');
			});

			$scope.$root.$on("sessionExpired", function() {
				$('#sessionExpirationDialog').modal('hide');
				$location.path("/login");
			});
			$scope.$root.back = function(state, params) {
				$scope.stateExt.back(state, params);
			};
		}
	])
;