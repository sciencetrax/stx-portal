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
        .controller("stx.encounters.view.details.controller", ['$scope', '$state', '$stateParams', 'SecurityService', 'VariablePanelScript', 'ScheduledEncounter',
            function ($scope, $state, $stateParams, SecurityService, VariablePanelScript, ScheduledEncounter) {
                $('#VariableToolsMenu').remove();

                VariablePanelScript.get({
                    customerId: SecurityService.authorizationContext.customerId,
                    projectId: SecurityService.authorizationContext.subject.projects[0].projectId,
                    siteId: SecurityService.authorizationContext.subject.projects[0].siteId,
                    subjectId: SecurityService.authorizationContext.subject.id,
                    intervalId: $stateParams.intervalId,
                    encounterId: $stateParams.encounterId,
                    includeProjectVariableGroups: false
                }, function (data) {
                    $('#VariableToolsMenu').remove();
                    var dataEntryPanel = $('.DataEntryPanel');
                    var scriptDiv = $('#variable-panel-code');
                    var script = $('<script/>');
                    script.append(data.project);
                    script.append(data.interval);
                    script.append(data.encounter);
                    scriptDiv.html(script);

                    for (var index = 0; index < data.dependentVariables.length; index++) {
                        var variable = data.dependentVariables[index];
                        dataEntryPanel.append("<input type='hidden' id='vcid" + variable.variableId + "' isHiddenVariable='true' VariableGroupId='" + variable.variableGroupId + "' variableId='" + variable.variableId + "'>" + variable.value + "</input>");
                    }
                    script.append(data.initialize);
                    script.append("\r\n$(document).trigger('pageLoad');");
//                scriptDiv.append("<script>" + data.initialize + " $(document).trigger('pageLoad');" + "</script>");
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


