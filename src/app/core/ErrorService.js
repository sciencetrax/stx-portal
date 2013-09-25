(function () {
    "use strict";

    angular.module('stx.core.systemService', [])
        .service('SystemService', ['$rootScope', function ($rootScope) {
            this.handleError = function (error) {
                bootbox.alert(LS.errorMessages.get(error.errorCode));
            };
        }]);
}());
