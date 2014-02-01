(function () {
	"use strict";
	angular.module('stx.encounters')
		.controller("EncountersListController", ['$filter', '$scope', 'authorizationContextResolver', 'ScheduledEncounterList',
			function ($filter, $scope, authorizationContextResolver, ScheduledEncounterList) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;

				$scope.LSPage = LS.pages.encounters.list;
				$scope.setFilter = function (value) {
					$scope.encounterFilter = value;
				};
				$scope.byCompletness = function (item) {
					if ($scope.encounterFilter == 'all') {
						return true;
					}

					return $filter('incomplete')(item);
				};
				$scope.encounterFilter = "all";


				$scope.encounters = ScheduledEncounterList.query({
					customerId: authorizationContext.customerId,
					projectId: $scope.portal.projectId,
					subjectId: subject.id
				});
			}])
	;
}());


