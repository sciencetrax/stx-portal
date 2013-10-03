(function () {
    "use strict";

    angular.module('stx.accounts.update', [
            'ui.router',
            'stx.core.webService',
            'stx.core.directives'
        ])
        .controller('accounts.update.controller',['$scope', 'Metadata', 'Account', 'SecurityService', function ($scope, Metadata, Account, SecurityService) {
            $scope.LSPage = LS.pages.accounts.update;
            $scope.metadata = {};
            $scope.metadata = Metadata.get({ entityType: 'account'});
            $scope.account = Account.get({
                customerId: SecurityService.authorizationContext.customerId,
                id: SecurityService.authorizationContext.userId
            });
            $scope.update = function() {
//                $scope.account.update();
                var account = this.account;
                Account.update(account, function(response) {
                    account.lastUpdateDate = response.lastUpdateDate;
                    this.original = angular.copy(this.account);
                });
            };
        }])
    ;
}());
