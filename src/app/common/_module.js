(function () {
    "use strict";

    angular.module('stx.common', [
            'stx.common.waiting'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('common', {
                    abstract: true,
                    url: '/common',
                    template: '<div ui-view></div>'
                })
                .state('common.waiting', {
                    url: '/waiting',
                    controller: 'WaitingController',
                    templateUrl: 'common/waiting.tpl.html',
                    data: { pageTitle: 'waiting' }
                })
            ;
        }])
    ;
}());


