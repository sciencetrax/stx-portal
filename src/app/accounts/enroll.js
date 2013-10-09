(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('AccountsEnrollController',
			['$scope', '$stateParams', '$location', 'portalResolver', 'Metadata', 'Account', 'DataEntryForm',
				function ($scope, $stateParams, $location, portalResolver, Metadata, Account, DataEntryForm) {
					var portal = portalResolver.data;
					$scope.LSPage = LS.pages.accounts.enroll;
					$scope.portal = portal;

					if (portal.enrollmentIntervalId == null) {
						$scope.error = {
							errorCode: "EnrollmentIntervalNotConfigured",
							message: $scope.LS.errorMessages.get('EnrollmentIntervalNotConfigured')
						};
					} else {
						var dataEntryPanel = $('.DataEntryPanel');
						DataEntryForm.loadEnrollmentScript(
							portal.projectId,
							portal.siteId,
							portal.enrollmentIntervalId, function () {
								DataEntryForm.get(
										authorizationContext.projectId,
										authorizationContext.portalId,
										$stateParams.intervalId,
										$stateParams.encounterId,
										$stateParams.variableGroupId
									)
									.success(function (data) {
										stx.VariablePanel.Utils.notCollectedVariablesId = null;
										stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;
										dataEntryPanel.html(data);
										$(document).trigger('pageLoad');
									});
							});
					}
				}])
	;
}());
