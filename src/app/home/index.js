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
		.controller("HomeIndexController", ['$scope', '$filter', 'authorizationContextResolver', 'portalResolver', 'ProjectReport', 'Subject', 'SubjectVariableGroupSummary', 'ScheduledEncounter', 'DataEntryForm',
			function ($scope, $filter, authorizationContextResolver, portalResolver, ProjectReport, Subject, SubjectVariableGroupSummary, ScheduledEncounter, DataEntryForm) {
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
				Subject.get(securityProfile, function (subject) {
					var creatableIntervals = portalResolver.data.creatableNonFixedIntervals;
					var includeScreeningIntervals = subject.enrollmentStatus < 4;
					var allowedIntervals = [];
					for(var index = 0; index < creatableIntervals.length; index++) {
						var interval = creatableIntervals[index];
						if (interval.screening == includeScreeningIntervals) {
							allowedIntervals.push(interval);
						}
					}
					$scope.encounterActions = allowedIntervals;
				});
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
