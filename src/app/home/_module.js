(function () {
    "use strict";
    angular.module('stx.home', [
            'stx.core',
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('home', {
                    abstract: true,
                    url: '/home',
					data: {
						history: 'reset',
						depends: [
							'authorizationContextResolver',
							'portalResolver'
						]
					},
                    views: {
                        'menu': { templateUrl: 'common/menu/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
                })
                .state('home.index', {
                    url: '/index',
                    controller: 'HomeIndexController',
                    templateUrl: 'home/index.tpl.html',
                    data: {
						navigation: 'reset',
						pageTitle: 'Home', isHome: true
					}
                })
                .state('home.index.summary', {
                    url: '/summary',
                    templateUrl: 'home/summary.tpl.html',
                    controller: 'HomeSummaryController'
                })
                .state('home.index.details', {
                    url: '/details',
                    templateUrl: 'home/details.tpl.html',
                    controller: 'HomeDetailsController'
                })
            ;
        }])
    ;
}());


