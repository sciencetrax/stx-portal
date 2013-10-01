(function () {
    "use strict";
    angular.module('stx.home.profile', [
            'stx.core'
        ])
        .controller("ProfileController", ['$scope', 'Account', 'SecurityService',
            function ($scope, Account, SecurityService) {
                $scope.LSPage = LS.pages.home.profile;
                $scope.account = Account.get({
                    customerId: SecurityService.authorizationContext.customerId,
                    id: SecurityService.authorizationContext.userId
                });
            }])
    ;
}());


