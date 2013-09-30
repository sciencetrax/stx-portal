(function () {
    "use strict";

    angular.module('stx.accounts.login', [
            'ui.router',
            'stx.core'
        ])
        .controller("LoginController", ['$scope', '$location', 'Authorization', 'SystemService', 'SecurityService',
            function ($scope, $location, Authorization, SystemService, SecurityService) {
                SecurityService.removeAuthorization();

                $scope.authorization = new Authorization();
                $scope.authorization.portalCode = PORTAL_CODE;
                $scope.login = function () {
                    $scope.authorization.$save(function (data) {
                        SecurityService.authorize(data.authorization);
                    }, function (data) {
                        SystemService.handleError(data.data);
                    });
                };
            }])
    ;
}());
