(function () {
	"use strict";

	angular.module('stx.variablegroups.update', [
			'stx.core',
			'ui.router'
		])
		.controller("VariableGroupsUpdateController", ['$scope', '$http', '$window', '$location', 'session', 'authorizationContextResolver', 'DataEntryForm',
			function ($scope, $http, $window, $location, session, authorizationContextResolver, DataEntryForm) {
				var $stateParams = $scope.$stateParams;
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var dataEntryPanel = $('.DataEntryPanelHolder');

				console.log("VariableGroupsUpdateController");
				/**/
				DataEntryForm.loadScript(
					authorizationContext.customerId,
					$scope.portal.projectId,
					$scope.portal.siteId,
					subject.id,
					$stateParams.intervalId,
					$stateParams.encounterId,
					false, function () {
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
								if ($(".DataEntryPanel.ReadOnly").length == 1) {
									$scope.readOnly = true;
								}
								$scope.ready = true;
							}
						);
					});

				/*
				$scope.save = function () {
					var form = $('form', dataEntryPanel);
					var action = form.attr('action');
					var queryString = action.substring(action.indexOf("?") + 1);
					form.attr('action', DataEntryForm.getUrl() + "?" + queryString);
					form.ajaxSubmit({
						headers: { "X-Authorization": session.authorization },
						success: function (data) {
							stx.VariablePanel.Utils.notCollectedVariablesId = null;
							stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;

							dataEntryPanel.html(data);
							if ($('.validation-summary-errors li', dataEntryPanel).length === 0) {
								$window.history.back();
								$scope.$apply();
							}
						}
					});
				};
				/**/
			}])
	;
}());


