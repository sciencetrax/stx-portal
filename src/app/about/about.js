(function () {
    "use strict";

    angular.module('stx.about', [
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('about', {
                    url: '/about',
                    controller: 'AboutController',
                    templateUrl: 'about/about.tpl.html',
                    data: { pageTitle: 'About' }
                })
            ;
        }])
        .controller("AboutController", [function () {

        }])
    ;
}());


