(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller("AccountsEmailAddressVerifiedController",
			['$scope', '$stateParams', 'PasswordReset', 'Metadata', 'SecurityService',
				function ($scope, $stateParams, PasswordReset, Metadata, SecurityService) {
					$scope.LSPage = LS.pages.accounts.emailAddressVerified;
					$scope.success = {
						message: $scope.LSPage.message
					};
				}
			]
		)
	;
}());


