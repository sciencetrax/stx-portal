(function () {
    "use strict";

    angular.module('stx.encounters')
        .controller("EncountersViewController", ['$scope', '$stateParams', '$location', 'authorizationContextResolver', 'DataEntryForm', 'ScheduledEncounter',
            function ($scope, $stateParams, $location, authorizationContextResolver, DataEntryForm, ScheduledEncounter) {
				var $state = $scope.$state;
				$scope.$root.loaded = false;
                if ($state.current.name === 'encounters.view') {
                    $location.path('/encounters/view/{0}/{1}/details'.format($stateParams.intervalId, $stateParams.encounterId)).replace();
                }

				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				ScheduledEncounter.query({
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					siteId: subject.projects[0].siteId,
					subjectId: subject.id,
					intervalId: $stateParams.intervalId,
					id: $stateParams.encounterId
				}, function (data) {
					$scope.encounter = data[0];
					$scope.encounterReady = true;
					$scope.$broadcast("encounterReady");
				});
            }])
        .controller("EncountersReportController", [
            function () {
            }])
    ;
}());


