(function () {
    "use strict";

    angular.module('stx.login')
        .controller("EmailSentController", ['$scope', '$state', '$location', 'Metadata', 'Portal', 'SecurityService',
            function ($scope, $state, $location, Metadata, Portal, SecurityService) {
				$scope.LSPage = LS.pages.login.emailSent;
			}])
    ;
}());
