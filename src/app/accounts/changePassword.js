(function () {
	"use strict";

	angular.module('stx.accounts')
		.controller('AccountsChangePasswordController', ['$scope', '$location', 'portalResolver', 'Metadata', 'Password', 'authorizationContextResolver',
			function ($scope, $location, portalResolver, Metadata, Password, authorizationContextResolver) {
				$scope.LSPage = LS.pages.accounts.changePassword;
				$scope.portal = portalResolver.data;
				$scope.metadata = {};
				$scope.metadata = Metadata.get({ entityType: 'account'});
				$scope.entity = new Password();
				$scope.entity.customerId = authorizationContextResolver.data.customerId;
				$scope.entity.userId = authorizationContextResolver.data.userId;
				$scope.update = function () {
					var entity = angular.copy($scope.entity);
					Password.save(entity, function () {
						$scope.back('accounts.view');
//						$location.path("/accounts/view");
					});
				};
			}])
	;
}());
