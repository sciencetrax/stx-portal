(function () {
    "use strict";

    angular.module('stx.encounters', [
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
                    controller: 'stx.encounters.view.controller',
                    templateUrl: 'encounters/view.tpl.html',
                    data: { pageTitle: 'Encounter' }
                })
                .state('encounters.view.details', { url: '/details', templateUrl: 'encounters/view-details.tpl.html', controller: 'stx.encounters.view.details.controller' })
                .state('encounters.view.reports', { url: '/reports', templateUrl: 'encounters/view-reports.tpl.html', controller: 'stx.encounters.view.reports.controller' })
            ;
        }])
    ;
}());


