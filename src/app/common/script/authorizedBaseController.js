var AuthorizedBaseController;
(function () {
    "use strict";

    AuthorizedBaseController = BaseController.extend({
        init: function ($scope) {
            var _this = this;
            this._super($scope);
            var authorizationContext = $scope.authorizationContext;

            _this._copyAuthorizationContextProperties(authorizationContext);
        },

        _copyAuthorizationContextProperties: function (authorizationContext) {
            if (authorizationContext.customerId === undefined) {
                return;
            }
            this.$scope.$root.customerId = authorizationContext.customerId;
            this.$scope.$root.projectId = authorizationContext.projectId;
            this.$scope.$root.siteId = authorizationContext.subject.projects[0].siteId;
            this.$scope.$root.subjectId = authorizationContext.subject.id;
        }
    });
    AuthorizedBaseController.$inject = ['$scope'];

    angular.module('stx.AuthorizedBaseController', [])
        .controller('AuthorizedBaseController', AuthorizedBaseController);
}());
