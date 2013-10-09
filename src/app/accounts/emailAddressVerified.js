(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller("AccountsEmailAddressVerifiedController",
			['$scope',
				function ($scope) {
					$scope.LSPage = LS.pages.accounts.emailAddressVerified;
					$scope.success = {
						message: $scope.LSPage.message
					};
				}
			]
		)
	;
}());


