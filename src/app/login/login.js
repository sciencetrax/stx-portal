var LoginController;
(function () {
    "use strict";

    LoginController = BaseController.extend({
        init: function ($scope, $location, Authorization, SecurityService) {
            var _controller = this;
            _controller._super($scope);

            SecurityService.removeAuthorization();
            var authorization = new Authorization();
            $scope.authorization = authorization;
            $scope.login = function () {
                authorization.portalCode = "pt";
                authorization.$save(function (data) {
                    SecurityService.authorize(data.authorization);
                }, function (data) {
                    _controller._handleError(data.data);
                });
            };
        }
    });
    LoginController.$inject = ['$scope', '$location', 'Authorization', 'SecurityService'];

    angular.module('stx.login', [
            'ui.state',
            'stxSecurityService',
            'stxWebServices'
        ])
        .config(function config($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'login/login.tpl.html',
                data: { pageTitle: 'Login' }
            });
        })
        .controller("LoginController", LoginController)
    ;
}());
