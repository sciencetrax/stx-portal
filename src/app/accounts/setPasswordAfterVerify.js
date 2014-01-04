(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller("AccountsSetPasswordAfterVerifyController",
			['$scope', '$stateParams', 'portalResolver', 'PasswordReset', 'Metadata',
            function ($scope, $stateParams, portalResolver, PasswordReset, Metadata) {
				var portal = portalResolver.data;
                $scope.LSPage = LS.pages.accounts.setPasswordAfterVerify;
				$scope.metadata = Metadata.get({ entityType: 'account'});
				$scope.entity = PasswordReset.get({
					portalId: portal.id,
					token: $stateParams.token
				});
				$scope.update = function() {
					$scope.entity.portalId = portal.id;
						PasswordReset.save($scope.entity, function() {
							$scope.success = {
								message: $scope.LSPage.passwordChangedMessage
							};
						});
				};
            }])
    ;
}());


