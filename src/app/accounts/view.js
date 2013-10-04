(function () {
    "use strict";
    angular.module('stx.accounts')
        .controller("AccountsViewController", ['$scope', 'Account', 'SecurityService',
            function ($scope, Account, SecurityService) {
                $scope.LSPage = LS.pages.accounts.view;
                $scope.account = Account.get({
                    customerId: SecurityService.authorizationContext.customerId,
                    id: SecurityService.authorizationContext.userId
                });
            }])
    ;
}());


