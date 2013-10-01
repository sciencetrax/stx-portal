(function () {
    "use strict";

    angular.module('stx.variablegroups', [
            'stx.variablegroups.update'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('variablegroups', {
                    abstract: true,
                    url: "/variablegroups",
                    views: {
                        'menu': { templateUrl: 'common/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
                })
                .state('variablegroups.update', {
                    url: '/update/{variableGroupId}/{intervalId}/{encounterId}',
                    controller: 'VariableGroupUpdate',
                    templateUrl: 'variablegroups/update.tpl.html',
                    data: { pageTitle: 'Variable Group Update' }
                })
            ;
        }])
    ;
}());


