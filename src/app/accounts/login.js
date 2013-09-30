(function () {
    "use strict";

    angular.module('stx.accounts.login', [
            'ui.router',
            'stx.core'
        ])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('login', {
                url: '/accounts/login',
                controller: 'accounts.login.controller',
                templateUrl: 'account/login.tpl.html',
                data: { pageTitle: 'Login' }
            });
        }])
        .controller("accounts.login.controller", ['$scope', '$location', 'Authorization', 'SystemService', 'SecurityService', function ($scope, $location, Authorization, SystemService, SecurityService) {
            SecurityService.removeAuthorization();

            $scope.authorization = new Authorization();
            $scope.login = function () {
                $scope.authorization.portalCode = "test";
                $scope.authorization.$save(function (data) {
                    SecurityService.authorize(data.authorization);
                }, function (data) {
                    SystemService.handleError(data.data);
                });
            };
        }])
    ;
}());
