(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller("AccountsViewController", ['$scope', 'authorizationContextResolver', 'portalResolver', 'Account', 'SubjectVariableGroupSummary', 'DataEntryForm',
            function ($scope, authorizationContextResolver, portalResolver, Account, SubjectVariableGroupSummary, DataEntryForm) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: $scope.portal.projectId,
					subjectId: subject.id
				};

				$('#page-instructions').html($('#message_accountInstructions').clone());

                $scope.LSPage = LS.pages.accounts.view;
				$scope.portal = portalResolver.data;
				$scope.account = Account.get({
                    customerId: authorizationContext.customerId,
                    id: authorizationContext.userId
                });
				$scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile);
				DataEntryForm.loadScript(
					authorizationContext.customerId,
					$scope.portal.projectId,
					subject.id,
					null,
					null,
					true, function () {
						$scope.$root.pageReady = true;
					});
            }])
    ;
}());


