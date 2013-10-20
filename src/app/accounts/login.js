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
					// we make a copy to save so that the form doesn't show invalid
					// prior to navigating away.
					var authorization = angular.copy($scope.authorization);
                    Authorization.save(authorization, function (data) {
                        stateExt.authorize(data.authorization);
                    }, function (data) {
						$scope.loggingIn = false;
						$('#loginBtn').button('reset');
                   });
                };
            }])
    ;
}());
