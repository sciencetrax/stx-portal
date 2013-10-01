(function () {
    "use strict";

    angular.module('stx.encounters', [
            'stx.encounters.details',
            'stx.encounters.view'
        ])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('encounters', {
                    abstract: true,
                    url: '/encounters',
                    views: {
                        'menu': { templateUrl: 'common/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
                })
                .state('encounters.view', {
                    url: '/view/{intervalId}/{encounterId}',
                    controller: 'ViewController',
                    templateUrl: 'encounters/view.tpl.html',
                    data: { pageTitle: 'Encounter' }
                })
                .state('encounters.view.details', {
                    url: '/details',
					controller: 'DetailsController',
                    templateUrl: 'encounters/view-details.tpl.html'
                })
                .state('encounters.view.reports', {
                    url: '/reports',
					controller: 'ReportController',
                    templateUrl: 'encounters/view-reports.tpl.html'
                })
            ;
        }])
    ;
}());


