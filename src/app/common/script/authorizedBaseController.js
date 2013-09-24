var AuthorizedBaseController;
(function () {
    "use strict";

    AuthorizedBaseController = BaseController.extend({
        init: function ($scope) {
            var _this = this;
            this._super($scope);
            var authorizationContext = $scope.authorizationContext;

            // We listen for this event which is fired when the context is finally loaded from
            // the webservice.
            $scope.$on('authorizationContextReady', function(event, message) {
                _this._copyAuthorizationContextProperties(authorizationContext);
                _this.onAuthorizationContextReady();
            });

            // We need to do in case the authorization context has already been initialized
            if (authorizationContext.customerId !== undefined) {
                $scope.$broadcast('authorizationContextReady');
            }
        },
        onAuthorizationContextReady: function() {
        },
        _copyAuthorizationContextProperties: function (authorizationContext) {
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
