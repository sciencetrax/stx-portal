(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller('AccountsRegisterController',
			['$scope', '$location', 'Metadata', 'Account', 'SecurityService',
            function ($scope, $location, Metadata, Account, SecurityService) {
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
                    });
                };
            }])
    ;
}());
