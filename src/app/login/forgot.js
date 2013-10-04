(function () {
    "use strict";

    angular.module('stx.login')
        .controller("ForgotController", ['$scope', '$state', '$location', 'EmailRequest', 'Metadata', 'Portal', 'SystemService', 'SecurityService',
            function ($scope, $state, $location, EmailRequest, Metadata, Portal, SystemService, SecurityService) {
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
					$location.path('/login/emailSent/forgotPassword');
				};
			}])
    ;
}());
