var AboutController;
(function () {
    "use strict";

    AboutController = AuthorizedBaseController.extend({
        init: function ($scope) {
            this._super($scope);
        }
    });
    AboutController.$inject = ['$scope'];

    angular.module('stx.about', [
            'ui.state'
        ])
        .config(function($stateProvider) {
            $stateProvider.state('about', {
                url: '/about',
                controller: 'AboutController',
                templateUrl: 'about/about.tpl.html',
                data: { pageTitle: 'About' }
            })
            ;
        })
        .controller("AboutController", AboutController)
    ;
}());


