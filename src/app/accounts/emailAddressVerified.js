(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller("AccountsEmailAddressVerifiedController",
			['$scope', '$stateParams', 'PasswordReset', 'Metadata',
				function ($scope, $stateParams, PasswordReset, Metadata) {
					$scope.LSPage = LS.pages.accounts.emailAddressVerified;
					$scope.success = {
						message: $scope.LSPage.message
					};
				}
			]
		)
	;
}());


