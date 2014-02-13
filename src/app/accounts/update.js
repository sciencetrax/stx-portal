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
					projectId: $scope.portal.projectId,
					portalId: $scope.portal.id,
					id: authorizationContextResolver.data.userId
				}, function(data) {
					data.projectId = $scope.portal.projectId;
					data.portalId = $scope.portal.id;
				});
				$scope.update = function () {
					var account = this.account;
					Account.update(account, function (response) {
						$scope.back('accounts.view');
					});
				};
			}])
	;
}());
