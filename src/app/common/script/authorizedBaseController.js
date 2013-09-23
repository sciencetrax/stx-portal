var AuthorizedBaseController;
(function () {
    "use strict";
    AuthorizedBaseController = BaseController.extend({
        authorizationContext: null,
        customerId: null,
        projectId: null,
        siteId: null,
        subjectId: null,

        init: function ($scope) {
            this._super($scope);
            this.authorizationContext = $scope.authorizationContext;
            if (this.authorizationContext != null) {
                this.authorizationContext = this.authorizationContext;
                this.customerId = this.authorizationContext.customerId;
                this.projectId = this.authorizationContext.projectId;
                this.siteId = this.authorizationContext.subject.projects[0].siteId;
                this.subjectId = this.authorizationContext.subject.id;
            }
        }
    });
    AuthorizedBaseController.$inject = ['$scope'];

    angular.module('stx.AuthorizedBaseController', [])
        .controller('AuthorizedBaseController', AuthorizedBaseController);
}());
