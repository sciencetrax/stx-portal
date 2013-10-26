(function () {
    "use strict";
    angular.module('stx.home')
        .controller("HomeSummaryController", ['$scope', 'portalResolver', 'authorizationContextResolver', 'ScheduledEncounter',
            function ($scope, portalResolver, authorizationContextResolver, ScheduledEncounter) {
				var portal = portalResolver.data;
				var authorizationContext = authorizationContextResolver.data;
                $scope.LSPage = LS.pages.home.index.summary;
                $scope.encounterActions = portalResolver.data.creatableNonFixedIntervals;

				$scope.incompleteSubjectEncounters = function (item) {
					return item.percentComplete < 0.999 && (item.viewable || item.creatable || item.editable);
				};
				$scope.createEncounter = function(intervalId) {
					var encounter = new ScheduledEncounter();
					encounter.customerId = authorizationContext.customerId;
					encounter.projectId = portal.projectId;
					encounter.siteId = portal.siteId;
					encounter.subjectId = authorizationContext.subject.id;
					encounter.intervalId = intervalId;
					ScheduledEncounter.save(encounter, function(encounter) {
						$scope.$state.go('encounters.view.details', {
							intervalId: intervalId,
							encounterId: encounter.id
						});
					});
				};
			}])
    ;
}());


