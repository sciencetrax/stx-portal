(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('AccountsFailedEnrollmentController',
			['$scope', 'session', 'portalResolver',
				function ($scope, session) {
					session.removeAuthorization();
					$scope.LSPage = LS.pages.accounts.failedEnrollment;
				}
			]
		)
	;
}());
