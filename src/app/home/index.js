(function () {
    "use strict";
    angular.module('stx.home.index', [
            'stx.core',
            'stx.home.incompleteVariableGroupSummaries',
            'ui.router'
        ])
        .controller("home.details.controller", ['$scope', '$state', '$filter', 'SecurityService', 'SubjectVariableGroupSummary', 'ScheduledEncounter',
            function ($scope, $state, $filter, SecurityService, SubjectVariableGroupSummary, ScheduledEncounter) {

        }])
        .controller("HomeController", ['$scope', '$state', '$filter', 'SecurityService', 'SubjectVariableGroupSummary', 'ScheduledEncounter', function ($scope, $state, $filter, SecurityService, SubjectVariableGroupSummary, ScheduledEncounter) {
            $scope.LSPage = LS.pages.home;
            $scope.$state = $state;
            var securityProfile = {
                customerId: SecurityService.authorizationContext.customerId,
                projectId: SecurityService.authorizationContext.subject.projects[0].projectId,
                subjectId: SecurityService.authorizationContext.subject.id,
                siteId: SecurityService.authorizationContext.subject.projects[0].siteId
            };

            $scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile, function (data) {
                $scope.incompleteSummaries = $filter('incompleteVariableGroupSummaries')(data);
            });
            $scope.encounters = ScheduledEncounter.query(securityProfile);
        }])
    ;
}());


