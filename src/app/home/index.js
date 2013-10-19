(function () {
    "use strict";
    angular.module('stx.home')
        .controller("HomeIndexController", ['$scope', '$filter', 'authorizationContextResolver', 'SubjectVariableGroupSummary', 'ScheduledEncounter',
            function ($scope, $filter, authorizationContextResolver, SubjectVariableGroupSummary, ScheduledEncounter) {
                var authorizationContext = authorizationContextResolver.data;
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
