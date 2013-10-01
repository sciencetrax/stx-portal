(function () {
    "use strict";
    angular.module('stx.home', [
            'stx.core',
            'stx.home.index',
            'stx.home.profile',
            'stx.home.incompleteVariableGroupSummaries',
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('home', {
                    abstract: true,
                    url: '/home',
                    views: {
                        'menu': { templateUrl: 'common/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
                })
                .state('home.index', {
                    url: '/index',
                    controller: 'HomeController',
                    templateUrl: 'home/index.tpl.html',
                    data: { pageTitle: 'Home' }
                })
                .state('home.index.summary', {
                    url: '/summary',
                    templateUrl: 'home/summary.tpl.html',
                    controller: 'HomeController'
                })
                .state('home.index.details', {
                    url: '/details',
                    templateUrl: 'home/details.tpl.html',
                    controller: 'HomeController'
                })
                .state('home.index.profile', {
                    url: '/profile',
                    templateUrl: 'home/profile.tpl.html',
                    controller: 'ProfileController'
                })
            ;
        }])
    ;
}());


