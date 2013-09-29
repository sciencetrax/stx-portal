(function () {
    "use strict";

    angular.module('stx.encounters.view', [
            'ui.router'
        ])
        .controller("stx.encounters.view.controller", ['$scope', '$state', '$stateParams',
            function ($scope, $state, $stateParams) {
                $scope.$state = $state;
                $scope.stateParams = $stateParams;
                if ($state.current.name === 'encounters.view') {
                    $state.go('encounters.view.details');
                }
            }])
        .controller("stx.encounters.view.details.controller", [
            function () {
            }])
        .controller("stx.encounters.view.details.controller", ['$scope', '$state', '$stateParams', 'SecurityService', 'VariablePanelScript', 'DataEntryForm', 'ScheduledEncounter',
            function ($scope, $state, $stateParams, SecurityService, VariablePanelScript, DataEntryForm, ScheduledEncounter) {
                $('#VariableToolsMenu').remove();

                DataEntryForm.loadScript(
                    SecurityService.authorizationContext.customerId,
                    SecurityService.authorizationContext.subject.projects[0].projectId,
                    SecurityService.authorizationContext.subject.projects[0].siteId,
                    SecurityService.authorizationContext.subject.id,
                    $stateParams.intervalId,
                    $stateParams.encounterId,
                    false);

                ScheduledEncounter.query({
                    customerId: SecurityService.authorizationContext.customerId,
                    projectId: SecurityService.authorizationContext.subject.projects[0].projectId,
                    siteId: SecurityService.authorizationContext.subject.projects[0].siteId,
                    subjectId: SecurityService.authorizationContext.subject.id,
                    $filter: 'IntervalId eq ' + $stateParams.intervalId //+ ' and EncounterId eq ' + $stateParams.encounterId
                }, function (data) {
                    $scope.encounter = data[0];
                });
            }])
    ;
}());


