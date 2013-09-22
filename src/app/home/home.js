angular.module('stxPortal.home', []);

    var HomeController = BaseController.extend({
    init: function ($scope, $routeParams, SubjectVariableGroupSummary, ScheduledEncounter) {
        /*
        var incompleteProjectVariableGroups = [];
        var authorizationContext = $scope.$root.authorizationContext;
        var summaries = SubjectVariableGroupSummary.query({
            customerId: authorizationContext.customerId,
            projectId: authorizationContext.projectId,
            siteId: authorizationContext.siteId,
            subjectId: authorizationContext.subjectId
        }, function () {
            for (var index = 0; index < summaries.length; index++) {
                var group = summaries[index];
                if (group.percentComplete == null || group.percentComplete < 0.9999) {
                    incompleteProjectVariableGroups.push(group);
                }
            }
        });

        var encounters = ScheduledEncounter.query({
            customerId: authorizationContext.customerId,
            projectId: authorizationContext.projectId,
            siteId: authorizationContext.siteId,
            subjectId: authorizationContext.subjectId
        });
        $scope.data = $.extend(new BaseData(), {
            projectVariableGroups: summaries,
            incompleteProjectVariableGroups: incompleteProjectVariableGroups,

            encounters: encounters
        });
        $scope.data.init($routeParams, "summary", "");
        */
    }
});
