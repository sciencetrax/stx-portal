(function () {
    "use strict";

    angular.module('stx.login.enroll', [
            'ui.router',
            'stx.core.webService',
            'stx.core.directives.metaValidate'
        ])
        .controller('EnrollController', ['$scope', 'portalResolver', 'DataEntryForm',
            function ($scope, portalResolver, DataEntryForm) {
                $scope.LSPage = LS.pages.accounts.enroll;
                $scope.portal = portalResolver.data;

				DataEntryForm.loadScript(
					authorizationContext.customerId,
					subject.projects[0].projectId,
					subject.projects[0].siteId,
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
							});
					});


				$scope.update = function () {
                    var account = this.account;
                    account.customerId = $scope.portal.project.customerId;
                    account.portalId = $scope.portal.id;
                    account.projectId = $scope.portal.project.id;
                    /**/
                    Account.save(account, function (response) {
                        account.lastUpdateDate = response.lastUpdateDate;
                    }, function(data) {
                        if (data.data.errorCode != null) {
                            $(window).scrollTop(0);
                            $scope.error = {
                                code: data.data.errorCode,
                                message: LS.errorMessages.get(data.data.errorCode)
                            };
                        } else {
                            SystemService.handleError(data.data);
                        }
                    });
                    /***/
                };
            }])
    ;
}());
