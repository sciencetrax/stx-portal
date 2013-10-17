(function () {
    "use strict";

    angular.module('stx.login.login', [
            'ui.router',
            'stx.core'
        ])
        .controller("LoginController", ['$scope', '$state', '$stateParams', '$location', 'stateExt', 'Authorization', 'EmailRequest', 'portalResolver',
            function ($scope, $state, $stateParams, $location, stateExt, Authorization, EmailRequest, portalResolver) {
                stateExt.removeAuthorization();
				var portal = portalResolver.data;

				var emailRequest = new EmailRequest();
				emailRequest.emailType = "AccountVerification";

				$scope.LSPage = LS.pages.login.login;
                $scope.portal = portal;
                $scope.authorization = new Authorization();
				$scope.resendVerificationEmail = function () {
					emailRequest.portalId = portal.id;
					emailRequest.emailType = "EmailAddressVerification";
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
                        stateExt.authorize(data.authorization);
                    }, function (data) {
						$scope.loggingIn = false;
						$('#loginBtn').button('reset');
                   });
                };
            }])
    ;
}());
