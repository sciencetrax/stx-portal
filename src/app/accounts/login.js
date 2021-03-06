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
				$scope.byReferenceId = $scope.$stateParams.byReferenceId == 'true';

				var emailRequest = new EmailRequest();
                $scope.authorization = new Authorization();

				$scope.$root.resendVerificationEmail = function () {
					emailRequest.portalId = portal.id;
					emailRequest.emailType = "EmailAddressVerification";
					EmailRequest.save(emailRequest, function () {
						$scope.successMessage = $scope.LS.common.verificationEmailSent;
					});
				};
				$scope.$root.resendUnlockAccountEmail = function () {
					var emailRequest = new EmailRequest();
					emailRequest.portalId = portal.id;
					emailRequest.emailType = "UnlockAccount";
					EmailRequest.save(emailRequest, function () {
						$scope.successMessage = $scope.LS.common.verificationEmailSent;
					});
				};
                function performLogin(username, password) {
                    emailRequest.username = username;
                    emailRequest.password = password;

                    $scope.authorization.portalCode = PORTAL_CODE;
                    // we make a copy to save so that the form doesn't show invalid
                    // prior to navigating away.
                    var authorization = angular.copy($scope.authorization);
                    Authorization.save(authorization, function (data) {
                        stateExt.authorizeAndNavigate(data.authorization, portal.sessionTimeoutSeconds * 1000, $scope.byReferenceId);
                    }, function (data) {
                        $scope.loggingIn = false;
                        $('#loginBtn').button('reset');
                    });
                }
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
                        stateExt.authorizeAndNavigate(data.authorization, portal.sessionTimeoutSeconds * 1000, $scope.byReferenceId);
                    }, function (data) {
						$scope.loggingIn = false;
						$('#loginBtn').button('reset');
                   });
                };
                if ($stateParams.username) {
                    $scope.authorization.username = $stateParams.username;
                    $scope.authorization.password = $stateParams.password;
                    performLogin($stateParams.username, $stateParams.password);
                }
            }])
    ;
}());
