(function () {
	"use strict";

	angular.module('stx.common', [
			'stx.core',
			'ui.router'
		])
		.controller("SecureMenuController", ['$scope', '$location', '$window',
			function ($scope, $location, $window) {
				$scope.ifNotDirty = function (url) {
					if ($scope.$root.dirtyState && $scope.$root.dirtyState.isDirty()) {
						bootbox.dialog({
							message: LS.common.dirtyPageWarning,
							buttons: {
								yes: {
									label: LS.common.yes,
									className: "btn-default",
									callback: function () {
										$scope.$root.dirtyState = null;
										$location.path(url);
									}
								},
								no: {
									label: LS.common.no,
									className: "btn-primary"
								}
							}
						});
						return;
					}
					$scope.$root.dirtyState = null;
					$location.path(url);
				};
				$scope.logout = function () {
					if ($scope.$root.dirtyState && $scope.$root.dirtyState.isDirty()) {
						bootbox.dialog({
							message: LS.common.dirtyPageWarning,
							buttons: {
								yes: {
									label: LS.common.yes,
									className: "btn-default",
									callback: function () {
										$scope.$root.dirtyState = null;
										$scope.$state.go('accounts.login', { byReferenceId: $scope.$root.session.loginByReferenceId });
									}
								},
								no: {
									label: LS.common.no,
									className: "btn-primary"
								}
							}
						});
						return;
					}
					$scope.$root.dirtyState = null;
					$window.location.href = $window.location.pathname;// + logoutUrl;
				};
				$scope.goback = function (url) {
					if ($scope.$root.dirtyState && $scope.$root.dirtyState.isDirty()) {
						bootbox.dialog({
							message: LS.common.dirtyPageWarning,
							buttons: {
								yes: {
									label: LS.common.yes,
									className: "btn-default",
									callback: function () {
										$scope.$root.dirtyState = null;
										$scope.back();
									}
								},
								no: {
									label: LS.common.no,
									className: "btn-primary"
								}
							}
						});
						return;
					}
					$scope.$root.dirtyState = null;
					$location.path(url);
				};
			}])
	;
}());


