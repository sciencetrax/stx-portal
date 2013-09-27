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
        .controller("EncounterViewController",['$scope', '$stateParams', 'SecurityService', 'ScheduledEncounter', function($scope, $stateParams, SecurityService, ScheduledEncounter) {
            $scope.stateParams = $stateParams;
            ScheduledEncounter.query({
                customerId: SecurityService.authorizationContext.customerId,
                projectId: SecurityService.authorizationContext.subject.projects[0].projectId,
                siteId: SecurityService.authorizationContext.subject.projects[0].siteId,
                subjectId: SecurityService.authorizationContext.subject.id,
                $filter: 'IntervalId eq ' + $stateParams.intervalId //+ ' and EncounterId eq ' + $stateParams.encounterId
            }, function (data) {
                $scope.encounter = data[0];
            });
//                $.extend(new BaseData(true), {
//                showIncomplete: function (item) {
//                    return item.percentComplete < .99999;
//                },
//
//                allowedEncounter: function (item) {
//                    return item.viewable || item.creatable || item.editable;
//                }
//            });
        }])
    ;
}());


