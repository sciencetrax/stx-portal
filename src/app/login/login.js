(function () {
    "use strict";

    angular.module('stx.login.login', [
            'ui.router',
            'stx.core'
        ])
        .controller("LoginController", ['$scope', '$state', '$location', 'Authorization', 'Portal', 'SecurityService', 'EmailRequest',
            function ($scope, $state, $location, Authorization, Portal, SecurityService, EmailRequest) {
                SecurityService.removeAuthorization();

				$scope.LSPage = LS.pages.login.login;
                $scope.portal = SecurityService.portal;
                $scope.authorization = new Authorization();

				var emailRequest = new EmailRequest();
				emailRequest.emailType = "AccountVerification";
				$scope.resendVerificationEmail = function (username, password) {
					emailRequest.portalId = SecurityService.portal.id;
					EmailRequest.save(emailRequest, function () {
						$scope.successMessage = $scope.LS.common.verificationEmailSent;
					});
				};

				$scope.login = function () {
					$('#loginBtn').button('loading');
					emailRequest.username = $scope.authorization.username;
					emailRequest.password = $scope.authorization.password;

                    $scope.authorization.portalCode = PORTAL_CODE;
                    $scope.authorization.$save(function (data) {
                        SecurityService.authorize(data.authorization);
                    }, function (data) {
						$scope.loggingIn = false;
						$('#loginBtn').button('reset');
                   });
                };
            }])
    ;
}());
