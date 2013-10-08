(function () {
    "use strict";

    angular.module('stx.login')
        .controller("ForgotController", ['$window', '$scope', '$state', '$location', 'EmailRequest', 'Metadata', 'Portal', 'SecurityService',
            function ($window, $scope, $state, $location, EmailRequest, Metadata, Portal, SecurityService) {
				$scope.LSPage = LS.pages.login.forgot;
				$scope.metadata = Metadata.get({ entityType: 'account'});
				$scope.emailRequest = new EmailRequest();
				$scope.emailRequest.portalId = SecurityService.portal.id;

				$scope.requestUsername = function () {
					var emailRequest = $scope.emailRequest;
					emailRequest.emailType = "ForgotUsername";
					EmailRequest.save(emailRequest, function () {
						$location.path('/login/emailSent/forgotUsername');
					});
				};
				$scope.requestPassword = function () {
					var emailRequest = $scope.emailRequest;
					emailRequest.emailType = "ForgotPassword";
//					emailRequest.loginUrl = UrlUtils.getHostAndPath($window.location.href) + "#/login";
//					emailRequest.returnUrl = UrlUtils.getHostAndPath($window.location.href) + "#/accounts/resetPassword/{token}";
					EmailRequest.save(emailRequest, function () {
						$location.path('/login/emailSent/forgotPassword');
					});
				};
			}])
    ;
}());
