var AuthorizedBaseController;
(function () {
    "use strict";

    AuthorizedBaseController = BaseController.extend({
        init: function ($scope) {
            var _this = this;
            this._super($scope);
        }
    });
    AuthorizedBaseController.$inject = ['$scope'];

    angular.module('stx.AuthorizedBaseController', [])
        .controller('AuthorizedBaseController', AuthorizedBaseController);
}());
