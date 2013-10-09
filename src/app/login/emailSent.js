(function () {
    "use strict";

    angular.module('stx.login')
        .controller("EmailSentController", ['$scope',
            function ($scope) {
				$scope.LSPage = LS.pages.login.emailSent;
			}])
    ;
}());
