(function () {
	"use strict";

	angular.module('stx.variablegroups.update', [
			'stx.core',
			'ui.router'
		])
		.controller("VariableGroupsUpdateController", ['$scope', '$http', '$window', '$location', 'session', 'authorizationContextResolver', 'DataEntryForm',
			function ($scope, $http, $window, $location, session, authorizationContextResolver, DataEntryForm) {
				function showLoading(show) {
					$scope.ready = show;
					$scope.$root.pageReady = show;
				}
				showLoading(false);
				if ($.oldDirtyState) {
					$.dirtyState = $.oldDirtyState;
				}

				var $stateParams = $scope.$stateParams;
				var authorizationContext = authorizationContextResolver.data;
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
						$('[class*=matrix-prompt-width-]').each(function() {
							var variablePanel = $(this);
							var classNames = variablePanel.attr('class').split(/\s+/);
							var className = "";
							for (var i=0; i<classNames.length; ++i) {
								if (classNames[i].startsWith('matrix-prompt-width')) {
									className = classNames[i];
								}
							}
							variablePanel.closest('.MatrixTable').addClass(className);
							variablePanel.removeClass(className);
						});

						$('.IndentLevel1').parent().parent().addClass("Indent1").addClass("Indent");
						$('.IndentLevel2').parent().parent().addClass("Indent2").addClass("Indent");
						$('.IndentLevel3').parent().parent().addClass("Indent3").addClass("Indent");
						$('.IndentLevel4').parent().parent().addClass("Indent4").addClass("Indent");

						$(document).trigger('pageLoad');
						var form = $('form', dataEntryPanel);
						$scope.$root.dirtyState = new stx.DirtyState(form);
						if ($(".DataEntryPanel.ReadOnly").length == 1) {
							$scope.readOnly = true;
						}
						showLoading(true);
					}
				);
//				DataEntryForm.loadScript(
//					authorizationContext.customerId,
//					authorizationContext.projectId,
//					authorizationContext.subjectId,
//					$stateParams.intervalId,
//					$stateParams.encounterId,
//					false, function () {
//					});
				$scope.cancel = function () {
					if ($scope.$root.dirtyState && $scope.$root.dirtyState.isDirty()) {
						bootbox.dialog({
							message: LS.common.dirtyPageWarning,
							buttons: {
								yes: {
									label: LS.common.yes,
									className: "btn-default",
									callback: function () {
										$scope.$root.dirtyState = null;
										$scope.back('home.index');
									}
								},
								no: {
									label: LS.common.no,
									className: "btn-primary"
								}
							}
						});
						return;
					}
					$scope.$root.dirtyState = null;
					$scope.back('home.index');
				};
				$scope.save = function () {
					var form = $('form', dataEntryPanel);
					var action = form.attr('action');
					var queryString = action.substring(action.indexOf("?") + 1);
					form.attr('action', DataEntryForm.getUrl() + "?" + queryString);
					$(':disabled', form).prop('disabled', false);
					$('#saveButton').button('loading');
					showLoading(false);

					form.ajaxSubmit({
						headers: { "X-Authorization": session.authorization },
						success: function (data) {
							stx.VariablePanel.Utils.notCollectedVariablesId = null;
							stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;

							function hasError(text) {
								var indexOfSummary = text.indexOf('class="validation-summary-errors"');
								if (indexOfSummary == -1) {
									return false;
								}
								var indexOfClosingDiv = text.indexOf('</div>', indexOfSummary);
								var indexOfListItem = text.indexOf('<li>', indexOfSummary);
								var indexOfListEnd = text.indexOf('</ul>', indexOfSummary);
								return indexOfListEnd < indexOfClosingDiv && indexOfListItem < indexOfListEnd;
							}
							if (!hasError(data)) {
								$scope.$root.dirtyState = null;
								$window.history.back();
								$scope.$apply();
								return;
							}

							dataEntryPanel.html(data);
							$('.IndentLevel1').parent().parent().addClass("Indent1").addClass("Indent");
							$('.IndentLevel2').parent().parent().addClass("Indent2").addClass("Indent");
							$('.IndentLevel3').parent().parent().addClass("Indent3").addClass("Indent");
							$('.IndentLevel4').parent().parent().addClass("Indent4").addClass("Indent");

							$(document).trigger('pageLoad');
							if ($(".DataEntryPanel.ReadOnly").length == 1) {
								$scope.readOnly = true;
							}
							$('.validation-summary-errors')[0].scrollIntoView(false);
							$('#saveButton').button('reset');
							showLoading(true);
						}
					});
				};
			}])
	;
}());


