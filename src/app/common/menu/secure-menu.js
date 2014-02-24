(function () {
	"use strict";

	angular.module('stx.common', [
			'stx.core',
			'ui.router'
		])
		.controller("SecureMenuController", ['$scope', '$location',
			function ($scope, $location) {
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
					$scope.$state.go('accounts.login', { byReferenceId: $scope.$root.session.loginByReferenceId });
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
					$location.path(url);
				};
			}])
	;
}());


