(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller("AccountsUnlockedController",
			['$scope',
				function ($scope) {
					$scope.LSPage = LS.pages.accounts.accountUnlocked;
					$scope.success = {
						message: $scope.LSPage.message
					};
				}
			]
		)
	;
}());


