(function () {
    "use strict";
    angular.module('stx.home.index', [
            'stx.core',
            'stx.home.incompleteVariableGroupSummaries',
            'ui.router'
        ])
        .controller("IndexController", ['$scope', '$filter', 'SecurityService', 'SubjectVariableGroupSummary', 'ScheduledEncounter',
            function ($scope, $filter, SecurityService, SubjectVariableGroupSummary, ScheduledEncounter) {
                var authorizationContext = SecurityService.authorizationContext;
                var subject = authorizationContext.subject;
                var securityProfile = {
                    customerId: authorizationContext.customerId,
                    projectId: subject.projects[0].projectId,
                    subjectId: subject.id,
                    siteId: subject.projects[0].siteId
                };

                $scope.LSPage = LS.pages.home.index;
                $scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile,
                    function (data) {
                        $scope.incompleteSummaries = $filter('incompleteVariableGroupSummaries')(data);
                    });
                $scope.encounters = ScheduledEncounter.query(securityProfile);
            }])
    ;
}());


