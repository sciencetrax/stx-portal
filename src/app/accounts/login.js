(function () {
    "use strict";

    angular.module('stx.login.login', [
            'ui.router',
            'stx.core'
        ])
        .controller("LoginController", ['$scope', '$state', '$stateParams', '$location', 'session', 'stateExt', 'Authorization', 'EmailRequest', 'portalResolver',
            function ($scope, $state, $stateParams, $location, session, stateExt, Authorization, EmailRequest, portalResolver) {
				$scope.LSPage = LS.pages.accounts.login;
                session.removeAuthorization();
				var portal = $scope.portal;

				var emailRequest = new EmailRequest();
				emailRequest.emailType = "AccountVerification";

                $scope.authorization = new Authorization();
                $scope.logASubjectIn = false;
                $scope.setLogASubjectIn = function(logASubjectIn) {
					$scope.logASubjectIn = logASubjectIn;
				};
				$scope.resendVerificationEmail = function () {
					emailRequest.portalId = portal.id;
					emailRequest.emailType = "EmailAddressVerification";
					EmailRequest.save(emailRequest, function () {
						$scope.successMessage = $scope.LS.common.verificationEmailSent;
					});
				};
				$scope.login = function () {
					// This is a hack to fix the bug with angular where autocompleted fields (LastPass) do
					// not cause angular to recognize model changes.
					// https://github.com/angular/angular.js/issues/1460#issuecomment-15793081
					$('input[ng-model]').each(function (index, item) {
						if (angular.element(this).attr('type') !== 'checkbox' && angular.element(this).attr('type') !== 'radio') {
							angular.element(this).controller('ngModel').$setViewValue($(this).val());
						}
					});
					$('#loginBtn').button('loading');
					emailRequest.username = $scope.authorization.username;
					emailRequest.password = $scope.authorization.password;

                    $scope.authorization.portalCode = PORTAL_CODE;
					// we make a copy to save so that the form doesn't show invalid
					// prior to navigating away.
					var authorization = angular.copy($scope.authorization);
                    Authorization.save(authorization, function (data) {
                        stateExt.authorizeAndNavigate(data.authorization, portal.sessionTimeoutSeconds * 1000);
                    }, function (data) {
						$scope.loggingIn = false;
						$('#loginBtn').button('reset');
                   });
                };
            }])
    ;
}());
