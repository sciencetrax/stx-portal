(function () {
    "use strict";

    angular.module('stx.common', [
            'ui.router'
        ])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('waiting', {
                url: '/waiting',
                controller: 'WaitingController',
                templateUrl: 'common/waiting.tpl.html',
                data: { pageTitle: 'waiting' }
            })
            ;
        }])
        .controller("WaitingController", function() {

        })
    ;
}());


