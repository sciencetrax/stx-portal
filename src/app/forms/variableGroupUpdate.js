(function () {
    "use strict";

    angular.module('stx.about', [
            'ui.state'
        ])
        .config(function($stateProvider) {
            $stateProvider.state('about', {
                url: '/about',
                controller: 'AboutController',
                templateUrl: 'about/variableGroupUpdate.tpl.html',
                data: { pageTitle: 'About' }
            })
            ;
        })
        .controller("AboutController", function() {

        })
    ;
}());


