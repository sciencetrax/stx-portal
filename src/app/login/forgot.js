(function () {
    "use strict";

    angular.module('stx.login')
        .controller("ForgotController", ['$window', '$scope', '$state', '$location', 'portalResolver', 'EmailRequest', 'Metadata', 'Portal',
            function ($window, $scope, $state, $location, portalResolver, EmailRequest, Metadata, Portal) {
				var portal = portalResolver.data;
				$scope.LSPage = LS.pages.login.forgot;
				$scope.metadata = Metadata.get({ entityType: 'account'});
				$scope.emailRequest = new EmailRequest();
				$scope.emailRequest.portalId = portal.id;

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
					EmailRequest.save(emailRequest, function () {
						$location.path('/login/emailSent/forgotPassword');
					});
				};
			}])
    ;
}());
