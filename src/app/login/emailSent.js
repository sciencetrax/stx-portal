(function () {
    "use strict";

    angular.module('stx.login')
        .controller("EmailSentController", ['$scope', '$state', '$location', 'Metadata', 'Portal', 'SystemService', 'SecurityService',
            function ($scope, $state, $location, Metadata, Portal, SystemService, SecurityService) {
				$scope.LSPage = LS.pages.login.emailSent;
			}])
    ;
}());
