(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('AccountsFailedEnrollmentController',
			['$scope', 'session', 'portalResolver',
				function ($scope, session, portalResolver) {
					session.removeAuthorization();
					var portal = portalResolver.data;
					$scope.LSPage = LS.pages.accounts.failedEnrollment;
					$scope.portal = portal;
					$('#failedEnrollment').clone().appendTo($('#contentDiv'));
				}
			]
		)
	;
}());
