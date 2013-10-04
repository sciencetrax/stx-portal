(function () {
    "use strict";

    angular.module('stx.encounters.view', [
            'ui.router'
        ])
        .controller("ViewController", ['$scope', '$state', '$stateParams', '$location', 'DataEntryForm', 'ScheduledEncounter', 'SecurityService',
            function ($scope, $state, $stateParams, $location, DataEntryForm, ScheduledEncounter, SecurityService) {
                if ($state.current.name === 'encounters.view') {
                    $location.path('/encounters/view/{0}/{1}/details'.format($stateParams.intervalId, $stateParams.encounterId)).replace();
                }

				var authorizationContext = SecurityService.authorizationContext;
				var subject = authorizationContext.subject;
				ScheduledEncounter.query({
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					siteId: subject.projects[0].siteId,
					subjectId: subject.id,
					$filter: 'IntervalId eq ' + $stateParams.intervalId //+ ' and EncounterId eq ' + $stateParams.encounterId
				}, function (data) {
					$scope.encounter = data[0];
				});
            }])
        .controller("ReportController", [
            function () {
            }])
    ;
}());


