(function () {
    "use strict";

    angular.module('stx.encounters.view', [
            'ui.state'
        ])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('encountersView', {
                url: '/encounters/view/{intervalId}/{encounterId}',
                controller: 'EncounterViewController',
                templateUrl: 'encounters/view.tpl.html',
                data: { pageTitle: 'Encounter' }
            })
            .state('encountersView.details', { url: '/details', templateUrl: 'encounters/view-details.tpl.html', controller: 'EncounterViewController' })
            .state('encountersView.reports', { url: '/reports', templateUrl: 'encounters/view-reports.tpl.html', controller: 'EncounterViewController' })
            ;
        }])
        .controller("EncounterViewController",['$scope', '$stateParams', 'SecurityService', 'VariablePanelScript', 'ScheduledEncounter', function($scope, $stateParams, SecurityService, VariablePanelScript, ScheduledEncounter) {
            $scope.stateParams = $stateParams;
            $('#VariableToolsMenu').remove();

            VariablePanelScript.get({
                customerId: SecurityService.authorizationContext.customerId,
                projectId: SecurityService.authorizationContext.subject.projects[0].projectId,
                siteId: SecurityService.authorizationContext.subject.projects[0].siteId,
                subjectId: SecurityService.authorizationContext.subject.id,
                intervalId: $stateParams.intervalId,
                includeProjectVariableGroups: false
            }, function(data) {
                $('#VariableToolsMenu').remove();
                var dataEntryPanel = $('.DataEntryPanel');
                for(var index = 0; index < data.dependentVariables.length; index++) {
                    var variable = data.dependentVariables[index];
                    dataEntryPanel.append("<input type='hidden' id='vcid" +  variable.variableId + "' isHiddenVariable='true' VariableGroupId='" + variable.variableGroupId + "' variableId='" + variable.variableId + "'>" + variable.value + "</input>");
                }
                $('#variable-panel-code').append("<script>" + data.initialize + " $(document).trigger('pageLoad');" + "</script>");
                $('.DataEntryPanel li.hide').removeClass('hide');
            });

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


