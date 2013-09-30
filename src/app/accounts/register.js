(function () {
    "use strict";

    angular.module('stx.accounts.register', [
            'ui.router',
            'stx.core.webService',
            'stx.core.directives.metaValidate'
        ])
        .controller('RegisterController', ['$scope', 'Metadata', 'Account', 'SecurityService',
            function ($scope, Metadata, Account, SecurityService) {
                $scope.LSPage = LS.pages.accounts.register;
                $scope.metadata = Metadata.get({ entityType: 'account'});
                $scope.portal = SecurityService.portal;
                $scope.account = new Account();

                $scope.update = function () {
                    var account = this.account;
                    account.customerId = $scope.portal.project.customerId;
                    account.portalId = $scope.portal.id;
                    account.projectId = $scope.portal.project.id;
                    /**/
                    Account.save(account, function (response) {
                        account.lastUpdateDate = response.lastUpdateDate;
                    }, function(data) {
                        if (data.data.errorCode != null) {
                            $(window).scrollTop(0);
                            $scope.error = {
                                code: data.data.errorCode,
                                message: LS.errorMessages.get(data.data.errorCode)
                            };
                        } else {
                            SystemService.handleError(data.data);
                        }
                    });
                    /***/
                };
            }])
    ;
}());
