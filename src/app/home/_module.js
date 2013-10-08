(function () {
    "use strict";
    angular.module('stx.home', [
            'stx.core',
            'stx.home.details',
            'stx.home.incompleteVariableGroupSummaries',
            'stx.home.index',
            'stx.home.summary',
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('home', {
                    abstract: true,
                    url: '/home',
                    views: {
                        'menu': { templateUrl: 'common/menu/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
                })
                .state('home.index', {
                    url: '/index',
                    controller: 'IndexController',
                    templateUrl: 'home/index.tpl.html',
                    data: { pageTitle: 'Home', isHome: true }
                })
                .state('home.index.summary', {
                    url: '/summary',
                    templateUrl: 'home/summary.tpl.html',
                    controller: 'SummaryController'
                })
                .state('home.index.details', {
                    url: '/details',
                    templateUrl: 'home/details.tpl.html',
                    controller: 'DetailsController'
                })
            ;
        }])
    ;
}());


