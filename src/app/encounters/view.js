(function () {
    "use strict";

    angular.module('stx.encounters')
        .controller("EncountersViewController", ['$scope', '$stateParams', '$location', 'authorizationContextResolver', 'DataEntryForm', 'ScheduledEncounter',
            function ($scope, $stateParams, $location, authorizationContextResolver, DataEntryForm, ScheduledEncounter) {
				$('#VariableToolsMenu').remove();

				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var params = {
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					siteId: subject.projects[0].siteId,
					subjectId: subject.id,
					intervalId: $stateParams.intervalId,
					id: $stateParams.encounterId
				};

				ScheduledEncounter.query(params, function (data) {
					$scope.encounter = data[0];
					$scope.encounter.ready = true;
					$scope.$broadcast("encounterReady");
/*

					DataEntryForm.loadScript(
						authorizationContext.customerId,
						subject.projects[0].projectId,
						subject.projects[0].siteId,
						subject.id,
						$stateParams.intervalId,
						$stateParams.encounterId,
						false, function () {
						});
					/**/
				});

//				$scope.encounterFilter = 'all';
            }])
        .controller("EncountersReportController", [
            function () {
            }])
    ;
}());


