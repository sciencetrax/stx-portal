(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller('AccountsRegisterController',
			['$scope', '$location', 'Metadata', 'Account', 'SecurityService', 'SystemService',
            function ($scope, $location, Metadata, Account, SecurityService, SystemService) {
                $scope.LSPage = LS.pages.login.register;
                $scope.metadata = Metadata.get({ entityType: 'account'});
                $scope.portal = SecurityService.portal;
                $scope.account = new Account();

                $scope.update = function () {
                    var account = this.account;
                    account.customerId = $scope.portal.project.customerId;
                    account.portalId = $scope.portal.id;
                    account.projectId = $scope.portal.project.id;

                    Account.save(account, function (response) {
                        $location.path('/login/emailSent/register');
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
                };
            }])
    ;
}());
