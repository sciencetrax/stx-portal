(function () {
    "use strict";

    angular.module('stx.login')
        .controller("ForgotController", ['$scope', '$state', '$location', 'Metadata', 'Portal', 'SystemService', 'SecurityService',
            function ($scope, $state, $location, Metadata, Portal, SystemService, SecurityService) {
				$scope.LSPage = LS.pages.login.forgot;
				$scope.metadata = Metadata.get({ entityType: 'account'});

				$scope.requestUsername = function () {
					$location.path('/login/emailSent/forgotUsername');
				};
				$scope.requestPassword = function () {
					$location.path('/login/emailSent/forgotPassword');
				};
			}])
    ;
}());
