(function () {
	"use strict";
	angular.module('stx.home')
		.filter('recentlyCompletedEncounters', ['$filter',
			function ($filter) {
			return function (array) {
				var result = [];
				var incompleteFilter = $filter('incomplete');
				var readOnlyEncounter = $filter('readOnlyEncounter');

				for (var index = 0; index < array.length; index++) {
					var item = array[index];
					if (!incompleteFilter(item)
						|| readOnlyEncounter(item)) {
						result.push(item);
					}
				}
				return result;
			};
		}])
		.controller("HomeIndexController", ['$scope', '$filter', 'authorizationContextResolver', 'portalResolver', 'ProjectReport', 'SubjectVariableGroupSummary', 'ScheduledEncounter', 'DataEntryForm',
			function ($scope, $filter, authorizationContextResolver, portalResolver, ProjectReport, SubjectVariableGroupSummary, ScheduledEncounter, DataEntryForm) {
				var authorizationContext = authorizationContextResolver.data;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: authorizationContext.projectId,
					subjectId: authorizationContext.subjectId
				};

				var summariesReady = false;
				var encountersReady = false;

				$('#page-instructions').html($('#message_homeInstructions').clone());

				$scope.LSPage = LS.pages.home.index;
				$scope.$root.pageReady = false;
				$scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile,
					function (data) {
						$scope.incompleteSummaries = $filter('incompleteVariableGroupSummaries')(data);
						summariesReady = true;
						$scope.$root.pageReady = summariesReady && encountersReady;
					});
				$scope.reports = ProjectReport.query({
					customerId: securityProfile.customerId,
					projectId: securityProfile.projectId,
					subjectId: securityProfile.subjectId
				});

				// TODO: We need to filter the list of creatable encounters to check for the ones
				// that match their screening/follow-up status.
				// - Where do we get the subjects screening status?
				$scope.encounterActions = portalResolver.data.creatableNonFixedIntervals;
				$scope.incompleteEncounters =[];
				$scope.recentlyCompletedEncounters =[];
				$scope.createEncounter = function(intervalId) {
					var encounter = new ScheduledEncounter();
					encounter.customerId = securityProfile.customerId;
					encounter.projectId = securityProfile.projectId;
					encounter.subjectId = securityProfile.subjectId;
					encounter.intervalId = intervalId;
					ScheduledEncounter.save(encounter, function(encounter) {
						$scope.$state.go('encounters.view', {
							intervalId: intervalId,
							encounterId: encounter.id
						});
					});
				};
				ScheduledEncounter.query(securityProfile, function (encounters) {
					encounters = $filter('orderBy')(encounters, 'dueDate', true);
					$scope.incompleteEncounters = $filter('incomplete')(encounters);
					$scope.incompleteEncounters = $filter('incomplete')($scope.incompleteEncounters);
					$scope.recentlyCompletedEncounters = $filter('recentlyCompletedEncounters')(encounters);

					encountersReady = true;
					$scope.$root.pageReady = summariesReady && encountersReady;
				});
				DataEntryForm.loadScript(
					securityProfile.customerId,
					securityProfile.projectId,
					securityProfile.subjectId,
					null,
					null,
					true, function () {
						$scope.$root.pageReady = true;
					});
			}])
	;
}());
