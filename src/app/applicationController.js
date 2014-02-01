angular.module('stx')
	.controller('ApplicationController', ['$scope', '$window', '$location', '$http', '$state', '$stateParams', 'dependencyResolver', 'session', 'stateExt',
		function ($scope, $window, $location, $http, $state, $stateParams, dependencyResolver, session, stateExt) {
			$http.defaults.headers.common[Constants.VersionHeader] = "1.00";
			if (typeof(stx) != 'undefined') {
				var applicationPath = APPLICATION_PATH;
				if (!applicationPath.startsWith("http")) {
					applicationPath = applicationPath.replace("//", "/");
				}
				stx.Constants.ApplicationPath = applicationPath;
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

			LS.portalName = $('#menu_brand').html();

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
			$scope.$root.pageReady = true;
			$scope.$root.LS = LS;

			$scope.$state = $state;
			$scope.$stateParams = $stateParams;
			$scope.stateExt = stateExt;
			$scope.LS = LS;

			$scope.$root.$on("sessionExpirationWarning", function() {
				$('#sessionExpirationDialog').modal('show');
			});

			$scope.$root.getSubjectSite = function(subject, projectId) {
				projectId = projectId == null ? $scope.portal.projectId : projectId;
				for(var index = 0; index < subject.projects.length; index++) {
					var project = subject.projects[index];
					if (project.projectId == projectId) {
						return project.siteId;
					}
				}
				return null;
			};
			$scope.$root.$on("sessionExpired", function() {
				$('#sessionExpirationDialog').modal('hide');
				$location.path("/login");
			});
			$scope.$root.back = function(state, params) {
				$scope.stateExt.back(state, params);
			};
			$scope.$root.getErrorMessage = function(error) {
				try {
					var message = LS.errorMessages.get(error.errorCode);

					for (var name in error.details) {
						message = message.replace('{' + name + '}', error.details[name]);
					}

					return message;
				} catch (e) {
					return e;
				}
			};
		}
	])
;