(function () {
    "use strict";

    angular.module('stx.encounters')
        .controller("EncountersViewController", ['$scope', '$stateParams', '$location', 'authorizationContextResolver', 'DataEntryForm', 'ScheduledEncounter',
            function ($scope, $stateParams, $location, authorizationContextResolver, DataEntryForm, ScheduledEncounter) {
				$scope.$root.pageReady = false;
				if ($.dirtyState != null) {
					$.oldDirtyState = $.dirtyState;
					$.dirtyState = null;
				}
				$('#VariableToolsMenu').remove();

				var authorizationContext = authorizationContextResolver.data;
				var params = {
					customerId: authorizationContext.customerId,
					projectId: authorizationContext.projectId,
					subjectId: authorizationContext.subjectId,
					intervalId: $stateParams.intervalId,
					id: $stateParams.encounterId
				};

				ScheduledEncounter.query(params, function (data) {
					$scope.encounter = data[0];
					$scope.encounter.ready = true;
					$scope.$broadcast("encounterReady");


					DataEntryForm.loadScript(
						params.customerId,
						params.projectId,
						params.subjectId,
						$stateParams.intervalId,
						$scope.encounter.encounterId,
						false, function () {
							$scope.$root.pageReady = true;
						});
				});

				$scope.LSPage = LS.pages.encounters.view;
				$scope.encounterFilter = 'all';
            }])
    ;
}());


