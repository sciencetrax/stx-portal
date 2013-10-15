(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('AccountsEnrollController',
			['$scope', '$stateParams', '$location', 'portalResolver', 'Metadata', 'Account', 'DataEntryForm',
				function ($scope, $stateParams, $location, portalResolver, Metadata, Account, DataEntryForm) {
					var portal = portalResolver.data;
					$scope.LSPage = LS.pages.accounts.enroll;
					$scope.portal = portal;


					// http://lhstx.com/StudyTrax/api/
					// customers/projects/7354/sites/105/intervals/5678/variablePanelScript?includeProjectVariableGroups=false
					if (portal.enrollmentIntervalId == null) {
						$scope.error = {
							errorCode: "EnrollmentIntervalNotConfigured",
							message: $scope.LS.errorMessages.get('EnrollmentIntervalNotConfigured')
						};
					} else {
						DataEntryForm.loadEnrollmentScript(
							portal.project.customerId,
							portal.projectId,
							portal.siteId,
							portal.enrollmentIntervalId, function () {
								DataEntryForm.get(
										portal.projectId,
										portal.id,
										portal.enrollmentIntervalId
									)
									.success(function (data) {
										var dataEntryPanel = $('.DataEntryPanel');
										stx.VariablePanel.Utils.notCollectedVariablesId = null;
										stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;
										dataEntryPanel.html(data);
										$(document).trigger('pageLoad');
										$scope.ready = true;
									});
							});
					}
				}
			]
		)
	;
}());
