(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller("AccountsResetPasswordController",
			['$scope', '$stateParams', 'PasswordReset', 'Metadata', 'SecurityService',
            function ($scope, $stateParams, PasswordReset, Metadata, SecurityService) {
                $scope.LSPage = LS.pages.accounts.resetPassword;
				$scope.metadata = Metadata.get({ entityType: 'account'});
				if (angular.isDefined(SecurityService.portal.id)) {
					$scope.entity = PasswordReset.get({
						portalId: SecurityService.portal.id,
						token: $stateParams.token
					});
				}
				$scope.$on('portalReady', function() {
					$scope.entity = PasswordReset.get({
						portalId: SecurityService.portal.id,
						token: $stateParams.token
					});
				});

				$scope.update = function() {
					$scope.entity.portalId = SecurityService.portal.id;
						PasswordReset.save($scope.entity, function() {
							$scope.success = {
								message: $scope.LSPage.passwordChangedMessage
							};
//							$location.path()
						});
				};
            }])
    ;
}());


