(function () {
    "use strict";

    angular.module('stx.encounters')
        .controller("EncountersViewController", ['$scope', '$stateParams', '$location', 'authorizationContextResolver', 'DataEntryForm', 'ScheduledEncounter',
            function ($scope, $stateParams, $location, authorizationContextResolver, DataEntryForm, ScheduledEncounter) {
				$scope.$root.pageReady = false;
				$('#VariableToolsMenu').remove();

				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var params = {
					customerId: authorizationContext.customerId,
					projectId: $scope.portal.projectId,
					siteId: $scope.portal.siteId,
					subjectId: subject.id,
					intervalId: $stateParams.intervalId,
					id: $stateParams.encounterId
				};

				ScheduledEncounter.query(params, function (data) {
					$scope.encounter = data[0];
					$scope.encounter.ready = true;
					$scope.$broadcast("encounterReady");


					DataEntryForm.loadScript(
						authorizationContext.customerId,
						$scope.portal.projectId,
						$scope.portal.siteId,
						subject.id,
						$stateParams.intervalId,
						$stateParams.encounterId,
						false, function () {
							$scope.$root.pageReady = true;
						});
				});

				$scope.LSPage = LS.pages.encounters.view;
				$scope.encounterFilter = 'all';
            }])
    ;
}());


