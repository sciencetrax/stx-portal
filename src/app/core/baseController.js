
var BaseController;
(function () {
    "use strict";

    BaseController = Class.extend({
        $scope: null,

        init: function ($scope) {
            this.$scope = $scope;
//            $scope.LS = LS;
        }
//        _handleError: function (error) {
//            bootbox.alert(this.$scope.LS.errorMessages.get(error.errorCode));
//        }
    });
    BaseController.$inject = ['$scope'];

    angular.module('stx.BaseController', [])
        .controller('BaseController', BaseController);
}());
/**/