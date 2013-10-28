(function () {
	"use strict";
	angular.module('stx.home')
		.filter('recentlyCompletedEncounters', function () {
			return function (array) {
				var result = [];
				for (var index = 0; index < array.length; index++) {
					var item = array[index];
					if (item.percentComplete > 0.9999) {
						result.push(item);
					}
				}
				return result;
			};
		})
		.controller("HomeIndexController", ['$scope', '$filter', 'authorizationContextResolver', 'ProjectReport', 'SubjectVariableGroupSummary', 'ScheduledEncounter',
			function ($scope, $filter, authorizationContextResolver, ProjectReport, SubjectVariableGroupSummary, ScheduledEncounterList) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					subjectId: subject.id,
					siteId: subject.projects[0].siteId
				};

				var summariesReady = false;
				var encountersReady = false;

				$scope.LSPage = LS.pages.home.index;
				$scope.$root.pageReady = false;
				$scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile,
					function (data) {
						$scope.incompleteSummaries = $filter('incompleteVariableGroupSummaries')(data);
						summariesReady = true;
						$scope.$root.pageReady = summariesReady && encountersReady;
					});
				$scope.reports = ProjectReport.query({
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId
				});


				ScheduledEncounterList.query(securityProfile,
					function (encounters) {
						encounters = $filter('orderBy')(encounters, 'dueDate', true);
						$scope.incompleteEncounters = $filter('incomplete')(encounters);
						$scope.recentlyCompletedEncounters = $filter('recentlyCompletedEncounters')(encounters);

						encountersReady = true;
						$scope.$root.pageReady = summariesReady && encountersReady;
					});
			}])
	;
}());
