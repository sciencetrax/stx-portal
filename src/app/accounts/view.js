(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller("AccountsViewController", ['$scope', 'Account', 'SecurityService', 'SubjectVariableGroupSummary',
            function ($scope, Account, SecurityService, SubjectVariableGroupSummary) {
				var authorizationContext = SecurityService.authorizationContext;
				var subject = authorizationContext.subject;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					subjectId: subject.id,
					siteId: subject.projects[0].siteId
				};

                $scope.LSPage = LS.pages.accounts.view;
                $scope.account = Account.get({
                    customerId: SecurityService.authorizationContext.customerId,
                    id: SecurityService.authorizationContext.userId
                });
				$scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile);
            }])
    ;
}());


