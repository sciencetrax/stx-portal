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
		.controller("HomeIndexController", ['$scope', '$filter', 'authorizationContextResolver', 'portalResolver', 'ProjectReport', 'SubjectVariableGroupSummary', 'ScheduledEncounter',
			function ($scope, $filter, authorizationContextResolver, portalResolver, ProjectReport, SubjectVariableGroupSummary, ScheduledEncounter) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: $scope.portal.projectId,
					subjectId: subject.id,
					siteId: $scope.portal.siteId
				};

				var summariesReady = false;
				var encountersReady = false;

				$('#page-instructions').html($('#message_homeInstructions').clone());
				$('#no-incomplete-data').html($('#message_homeNoIncompleteData').clone());

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
					projectId: $scope.portal.projectId,
					subjectId: subject.id,
					siteId: $scope.portal.siteId
				});

				$scope.encounterActions = portalResolver.data.creatableNonFixedIntervals;
				$scope.incompleteEncounters =[];
				$scope.recentlyCompletedEncounters =[];
				$scope.createEncounter = function(intervalId) {
					var encounter = new ScheduledEncounter();
					encounter.customerId = authorizationContext.customerId;
					encounter.projectId = $scope.portal.projectId;
					encounter.subjectId = subject.id;
					encounter.siteId = $scope.portal.siteId;
					encounter.intervalId = intervalId;
					ScheduledEncounter.save(encounter, function(encounter) {
						$scope.$state.go('encounters.view', {
							intervalId: intervalId,
							encounterId: encounter.id
						});
					});
				};
				ScheduledEncounter.query(securityProfile,
					function (encounters) {
						encounters = $filter('orderBy')(encounters, 'dueDate', true);
						$scope.incompleteEncounters = $filter('incomplete')(encounters);
						$scope.incompleteEncounters = $filter('incomplete')($scope.incompleteEncounters);
						$scope.recentlyCompletedEncounters = $filter('recentlyCompletedEncounters')(encounters);

						encountersReady = true;
						$scope.$root.pageReady = summariesReady && encountersReady;
					});
			}])
	;
}());
