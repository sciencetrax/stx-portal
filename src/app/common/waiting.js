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
        .config(function($stateProvider) {
            $stateProvider.state('waiting', {
                url: '/waiting',
                controller: 'WaitingController',
                templateUrl: 'common/waiting.tpl.html',
                data: { pageTitle: 'waiting' }
            })
            ;
        })
        .controller("WaitingController", WaitingController)
    ;
}());


