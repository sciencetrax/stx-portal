(function () {
    "use strict";

    angular.module('stx.accounts.update', [
            'ui.router',
            'stx.core.webService',
            'stx.core.directives.metaValidate'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('accounts', {
                    abstract: true,
                    url: '/accounts',
                    template: '<div ui-view></div>'
                })
                .state('accounts.update', {
                    url: '/accounts/update',
                    controller: 'accounts.update.controller',
                    templateUrl: 'accounts/update.tpl.html',
                    data: { pageTitle: 'Account Update' }
                })
            ;
        }])
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
