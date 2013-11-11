(function () {
    "use strict";

    angular.module('stx.encounters', [
            'ui.router'
        ])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('encounters', {
                    abstract: true,
                    url: '/encounters',
					data: {
						secure: true,
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
                .state('encounters.list', {
                    url: '/list',
                    controller: 'EncountersListController',
                    templateUrl: 'encounters/list.tpl.html',
                    data: {
						navigation: 'updateTop',
						pageTitle: 'History'
					}
                })
                .state('encounters.view', {
                    url: '/view/{intervalId}/{encounterId}',
                    controller: 'EncountersViewController',
                    templateUrl: 'encounters/view.tpl.html',
                    data: {
						navigation: 'updateTop',
						pageTitle: 'Encounter'
					}
                })
            ;
        }])
    ;
}());


