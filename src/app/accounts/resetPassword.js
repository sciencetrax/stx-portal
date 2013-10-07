(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller("AccountsResetPasswordController",
			['$scope', '$stateParams', 'PasswordReset', 'Metadata', 'SubjectVariableGroupSummary',
            function ($scope, $stateParams, PasswordReset, Metadata, SubjectVariableGroupSummary) {
                $scope.LSPage = LS.pages.accounts.resetPassword;
				$scope.metadata = Metadata.get({ entityType: 'account'});
				$scope.entity = PasswordReset.get({
					token: $stateParams.token
				});

				$scope.update = function() {
					PasswordReset.save($scope.entity);
				};
            }])
    ;
}());


