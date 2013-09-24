var WaitingController;
(function () {
    "use strict";

    WaitingController = AuthorizedBaseController.extend({
        init: function ($scope) {
            this._super($scope);
        }
    });
    WaitingController.$inject = ['$scope'];

    angular.module('stx.common', [
            'ui.state'
        ])
        .config(function config($stateProvider) {
            $stateProvider.state('waiting', {
                url: '/waiting',
                controller: 'WaitingController',
                templateUrl: 'common/about.tpl.html',
                data: { pageTitle: 'waiting' }
            })
            ;
        })
        .controller("WaitingController", WaitingController)
    ;
}());


