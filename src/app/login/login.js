(function () {
    "use strict";

    angular.module('stx.login.login', [
            'ui.router',
            'stx.core'
        ])
        .controller("LoginController", ['$scope', '$state', '$location', 'Authorization', 'Portal', 'SystemService', 'SecurityService',
            function ($scope, $state, $location, Authorization, Portal, SystemService, SecurityService) {
                SecurityService.removeAuthorization();

				$scope.LSPage = LS.pages.login.login;
                $scope.portal = SecurityService.portal;
                $scope.authorization = new Authorization();
                $scope.login = function () {
					$('#loginBtn').button('loading');

                    $scope.authorization.portalCode = PORTAL_CODE;
                    $scope.authorization.$save(function (data) {
                        SecurityService.authorize(data.authorization);
                    }, function (data) {
						$scope.loggingIn = false;
						$('#loginBtn').button('reset');
						if (data.data.errorCode != null) {
                            $scope.$root.error = {
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
