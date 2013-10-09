(function () {
	"use strict";
	angular.module('stx.home')
		.controller("HomeDetailsController", ['$scope',
			function ($scope) {
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


