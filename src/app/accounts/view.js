(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller("AccountsViewController", ['$scope', 'authorizationContextResolver', 'Account', 'SubjectVariableGroupSummary',
            function ($scope, authorizationContextResolver, Account, SubjectVariableGroupSummary) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					subjectId: subject.id,
					siteId: subject.projects[0].siteId
				};

                $scope.LSPage = LS.pages.accounts.view;
                $scope.account = Account.get({
                    customerId: authorizationContext.customerId,
                    id: authorizationContext.userId
                });
				$scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile);
            }])
    ;
}());


