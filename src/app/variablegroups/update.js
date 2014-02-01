(function () {
	"use strict";

	angular.module('stx.variablegroups.update', [
			'stx.core',
			'ui.router'
		])
		.controller("VariableGroupsUpdateController", ['$scope', '$http', '$window', '$location', 'session', 'authorizationContextResolver', 'DataEntryForm',
			function ($scope, $http, $window, $location, session, authorizationContextResolver, DataEntryForm) {
				$.dirtyState = $.oldDirtyState;

				var $stateParams = $scope.$stateParams;
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var dataEntryPanel = $('.DataEntryPanelHolder');

				$scope.LSPage = LS.pages.variableGroups.update;

				$(document).click(function(evt) {
					if ($(evt.target).closest('#variablePanelMenu').length > 0
						|| $(evt.target).closest('.VariablePanel').length > 0
						) {
						return;
					}
					$scope.clearOptionsMenu();
				});
				$(document).on('focus', '.VariablePanel', function() {
					$scope.clearOptionsMenu();
					var variablePanel = $('[variableId]', this);
					if (variablePanel.length === 0) {
						// The matrix puts the variableId on the variablePanel itself.
						variablePanel = $(this);
					}
					$scope.activeVariable = stx.VariablePanel.Controller.getVariable(variablePanel.attr('variableId'));
					$scope.activeVariablePanel = variablePanel;
					variablePanel.removeClass('highlight');
				});
				$scope.clearOptionsMenu = function() {
					if ($scope.activeVariablePanel) {
						$scope.activeVariablePanel.removeClass('highlight');
					}
					$scope.expanded = false;
					$scope.activeVariable = null;
					$scope.activeVariablePanel = null;
				};
				$scope.clearVariable = function() {
					stx.VariablePanel.ControlFunctions.setVariableValue($scope.activeVariable.variableId, null);
					stx.VariablePanel.Calculator.run();
				};
				$scope.showOptions = function() {
					$scope.expanded = !$scope.expanded;
					if ($scope.expanded) {
						$scope.activeVariablePanel.addClass('highlight');
						$scope.activeVariablePanel[0].scrollIntoView(false);
					} else {
						$scope.activeVariablePanel.removeClass('highlight');
					}
				};

				DataEntryForm.loadScript(
					authorizationContext.customerId,
					$scope.portal.projectId,
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
								$('.IndentLevel1').parent().parent().addClass("Indent1").addClass("Indent");
								$('.IndentLevel2').parent().parent().addClass("Indent2").addClass("Indent");
								$('.IndentLevel3').parent().parent().addClass("Indent3").addClass("Indent");
								$('.IndentLevel4').parent().parent().addClass("Indent4").addClass("Indent");

								$(document).trigger('pageLoad');
								if ($(".DataEntryPanel.ReadOnly").length == 1) {
									$scope.readOnly = true;
								}
								$scope.ready = true;
							}
						);
					});
				$scope.cancel = function () {
					if($.dirtyState && $.dirtyState.isDirty()) {
						bootbox.confirm("Page is dirty, are you sure you want to cancel?", function(success) {
							if (success) {
								$scope.back('home.index');
							}
						});
						return;
					}
					$scope.back('home.index');
				};
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
							} else {
								$('.IndentLevel1').parent().parent().addClass("Indent1").addClass("Indent");
								$('.IndentLevel2').parent().parent().addClass("Indent2").addClass("Indent");
								$('.IndentLevel3').parent().parent().addClass("Indent3").addClass("Indent");
								$('.IndentLevel4').parent().parent().addClass("Indent4").addClass("Indent");

								$(document).trigger('pageLoad');
								if ($(".DataEntryPanel.ReadOnly").length == 1) {
									$scope.readOnly = true;
								}
								$scope.ready = true;
								$('.validation-summary-errors')[0].scrollIntoView(false);
							}
						}
					});
				};
			}])
	;
}());


