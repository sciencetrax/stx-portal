(function () {
    "use strict";

    angular.module('stx.accounts.login', [
            'ui.router',
            'stx.core'
        ])
        .controller("LoginController", ['$scope', '$state', '$location', 'Authorization', 'Portal', 'SystemService', 'SecurityService',
            function ($scope, $state, $location, Authorization, Portal, SystemService, SecurityService) {
                $scope.$state = $state;
                $scope.LSPage = LS.pages.accounts.login;

                SecurityService.removeAuthorization();

                $scope.portal = SecurityService.portal;

                $scope.authorization = new Authorization();
                $scope.login = function () {
                    $scope.authorization.portalCode = PORTAL_CODE;
                    $scope.authorization.$save(function (data) {
                        SecurityService.authorize(data.authorization);
                    }, function (data) {
                        if (data.data.errorCode != null) {
                            $scope.error = {
                                code: data.data.errorCode,
                                message: LS.errorMessages.get(data.data.errorCode)
                            };
                        } else {
                            SystemService.handleError(data.data);
                        }
                   });
                };

                $scope.resendVerificationEmail = function() {
                    this.error = null;
                    this.successMessage = this.LSPage.verificationEmailSent;
                };
            }])
    ;
}());
