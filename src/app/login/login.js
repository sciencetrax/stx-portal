(function () {
    "use strict";

    angular.module('stx.login', [
            'ui.state',
            'stx.core'
        ])
        .config(function($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'login/login.tpl.html',
                data: { pageTitle: 'Login' }
            });
        })
        .controller("LoginController", ['$scope', '$location', 'Authorization', 'SystemService', 'SecurityService', function ($scope, $location, Authorization, SystemService, SecurityService) {
            SecurityService.removeAuthorization();

            $scope.authorization = new Authorization();
            $scope.login = function () {
                $scope.authorization.portalCode = "pt";
                $scope.authorization.$save(function (data) {
                    SecurityService.authorize(data.authorization);
                }, function (data) {
                    SystemService.handleError(data.data);
                });
            };
        }])
    ;
}());
