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
							'authorizationContextResolver'
						]
					},
					views: {
                        'menu': { templateUrl: 'common/menu/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
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
                .state('encounters.view.details', {
                    url: '/details',
					controller: 'EncountersViewDetailsController',
                    templateUrl: 'encounters/view-details.tpl.html'
                })
                .state('encounters.view.reports', {
                    url: '/reports',
					controller: 'EncountersReportController',
                    templateUrl: 'encounters/view-reports.tpl.html'
                })
            ;
        }])
    ;
}());


