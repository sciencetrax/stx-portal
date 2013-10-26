(function () {
	"use strict";
	angular.module('stx.home')
		.controller("HomeIndexController", ['$scope', '$filter', 'authorizationContextResolver', 'SubjectVariableGroupSummary', 'ScheduledEncounter',
			function ($scope, $filter, authorizationContextResolver, SubjectVariableGroupSummary, ScheduledEncounterList) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					subjectId: subject.id,
					siteId: subject.projects[0].siteId
				};

				$scope.LSPage = LS.pages.home.index;
				$scope.$root.pageReady = false;
				$scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile,
					function (data) {
						$scope.incompleteSummaries = $filter('incompleteVariableGroupSummaries')(data);
						$scope.incompleteSummaries.ready = true;
						$scope.$root.pageReady = $scope.incompleteSummaries.ready && $scope.encounters.ready;
					});
				$scope.encounters = ScheduledEncounterList.query(securityProfile,
					function () {
						$scope.encounters.ready = true;
						$scope.$root.pageReady = $scope.incompleteSummaries.ready && $scope.encounters.ready;
					});
			}])
	;
}());
