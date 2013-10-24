(function () {
	"use strict";

	angular.module('stx.accounts')
		.controller('AccountsUpdateController', ['$scope', '$location', 'portalResolver', 'Metadata', 'Account', 'authorizationContextResolver',
			function ($scope, $location, portalResolver, Metadata, Account, authorizationContextResolver) {
				$scope.LSPage = LS.pages.accounts.update;
				$scope.portal = portalResolver.data;
				$scope.metadata = {};
				$scope.metadata = Metadata.get({ entityType: 'account'});
				$scope.account = Account.get({
					customerId: authorizationContextResolver.data.customerId,
					id: authorizationContextResolver.data.userId
				});
				$scope.update = function () {
					var account = this.account;
					Account.update(account, function (response) {
						back('accounts.view');
					});
				};
			}])
	;
}());
