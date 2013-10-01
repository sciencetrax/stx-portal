(function () {
	"use strict";
	angular.module('stx.home.details', [
			'stx.core'
		])
		.controller("DetailsController", ['$scope', 'Account', 'SecurityService',
			function ($scope, Account, SecurityService) {
				$scope.LSPage = LS.pages.home.index.details;
				$scope.setFilter = function (value) {
					$scope.encounterFilter = value;
				};
				$scope.byCompletness = function (entry) {
					return $scope.encounterFilter == 'all';
				};
				$scope.encounterFilter = "all";
			}])
	;
}());


