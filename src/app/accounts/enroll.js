(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('AccountsEnrollController',
			['$scope', '$state', '$stateParams', '$location', 'stateExt', 'portalResolver', 'Metadata', 'Account', 'AuthorizationContext', 'DataEntryForm',
				function ($scope, $state, $stateParams, $location, stateExt, portalResolver, Metadata, Account, AuthorizationContext, DataEntryForm) {
					stateExt.removeAuthorization();
					var portal = portalResolver.data;
					$scope.LSPage = LS.pages.accounts.enroll;
					$scope.portal = portal;
					$scope.save = function () {
						var form = $('.DataEntryPanel form');
						var action = form.attr('action');
						var queryString = action.substring(action.indexOf("?") + 1);
						form.attr('action', DataEntryForm.getUrl() + "?" + queryString);
						form.ajaxSubmit({
							success: function (data) {
								stx.VariablePanel.Utils.notCollectedVariablesId = null;
								stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;
								var dataEntryPanel = $('.DataEntryPanel');
								dataEntryPanel.html(data);
								$(document).trigger('pageLoad');

								if ($('.validation-summary-errors li', dataEntryPanel).length === 0) {
									var authorization = $('#Form_Authorization').val();
									var isEnrolled = $('#Form_IsEnrolled').val();
									if (isEnrolled && portal.registration) {
										stateExt.authorize(authorization, false);
										$state.go('accounts.register');
									} else if (!isEnrolled) {
										// Redirect to error page.
									} else {
										// Redirect to thank you pate.
									}
								}
							}
						});
					};


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
