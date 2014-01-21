(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('AccountsEnrollController',
			['$scope', 'session', 'portalResolver', 'DataEntryForm',
				function ($scope, session, portalResolver, DataEntryForm) {
					session.removeAuthorization();
					var $state = $scope.$state;
					var portal = portalResolver.data;
					$scope.LSPage = LS.pages.accounts.enroll;
					$scope.portal = portal;
					$scope.save = function () {
						var form = $('.DataEntryPanelHolder form');
						var action = form.attr('action');
						var queryString = action.substring(action.indexOf("?") + 1);
						form.attr('action', DataEntryForm.getUrl() + "?" + queryString);
						form.ajaxSubmit({
							success: function (data) {
								stx.VariablePanel.Utils.notCollectedVariablesId = null;
								stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;
								var dataEntryPanel = $('.DataEntryPanelHolder');
								dataEntryPanel.html(data);
								$(document).trigger('pageLoad');

								if ($('.validation-summary-errors li', dataEntryPanel).length === 0) {
									/*
										InScreening = 1,
										FailedScreening = 2,
										PassedScreening = 3,
										Enrolled = 4,
										Unknown = 99
									*/
									var authorization = $('#Form_Authorization').val();
									var isEnrolled = $('#Form_EnrollmentStatusId').val() != 2;
									if (isEnrolled && portal.registration) {
										session.authorize(authorization, portal.sessionTimeoutSeconds * 1000);
										$state.go('accounts.register');
									} else if (!isEnrolled && portal.registration) {
										$state.go('accounts.failedEnrollment');
									} else {
										$state.go('finished');
									}
								}
							}
						});
					};


					// http://lhstx.com/StudyTrax/api/
					// customers/projects/7354/sites/105/intervals/5678/variablePanelScript?includeProjectVariableGroups=false
					if (!portal.anonymousInterval) {
						$scope.$root.errors = [
							{
								errorCode: "AnonymousDataEntryNotAllowed",
								message: $scope.LS.errorMessages.get('AnonymousDataEntryNotAllowed')
							}
						];
					} else if (portal.enrollmentIntervalId == null) {
						$scope.$root.errors = [
							{
								errorCode: "EnrollmentIntervalNotConfigured",
								message: $scope.LS.errorMessages.get('EnrollmentIntervalNotConfigured')
							}
						];
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
										var dataEntryPanel = $('.DataEntryPanelHolder');
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
