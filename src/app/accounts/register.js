(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('AccountsRegisterController',
			['$scope', '$location', 'portalResolver', 'session', 'stateExt', 'AuthorizationContext', 'EmailRequest', 'Metadata', 'Account',
				function ($scope, $location, portalResolver, session, stateExt, AuthorizationContext, EmailRequest, Metadata, Account) {
					$scope.LSPage = LS.pages.accounts.register;

					$('#page-instructions').html($('#message_registerInstructions').clone());

					$scope.metadata = Metadata.get({ entityType: 'account'});
					$scope.portal = portalResolver.data;
					if (!session.isAuthorized()) {
						$scope.account = new Account();
					} else {
						AuthorizationContext.get({}, function (context) {
							$scope.account = Account.get({
								customerId: context.customerId,
								id: context.userId
							});
						});
					}

					$scope.update = function () {
						var account = this.account;
						account.customerId = $scope.portal.project.customerId;
						account.portalId = $scope.portal.id;
						account.projectId = $scope.portal.project.id;

						if (!session.isAuthorized()) {
							Account.save(account, function (response) {
								$location.path('/login/emailSent/register');
							});
						} else {
							var username = account.username;
							var password = account.password;
							Account.update(account, function (response) {
								var welcomeRequest = new EmailRequest();
								welcomeRequest.portalId = $scope.portal.id;
								welcomeRequest.emailType = "Welcome";
								welcomeRequest.username = username;
								welcomeRequest.password = password;
								EmailRequest.save(welcomeRequest, function () {
									var verificationRequest = new EmailRequest();
									verificationRequest.portalId = $scope.portal.id;
									verificationRequest.emailType = "EmailAddressVerification";
									verificationRequest.username = username;
									verificationRequest.password = password;
									EmailRequest.save(verificationRequest, function () {
										$location.path('/login/emailSent/register');
									});
								});
							});
						}
					};
				}])
	;
}());
