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
					data: {
						depends: [
							'authorizationContextResolver'
						]
					},
					views: {
                        'menu': { templateUrl: 'common/menu/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
                })
                .state('variablegroups.update', {
                    url: '/update/{variableGroupId}/{intervalId}/{encounterId}',
                    controller: 'VariableGroupUpdate',
                    templateUrl: 'variablegroups/update.tpl.html',
                    data: {
						navigation: 'ignore',
						pageTitle: 'Variable Group Update'
					}
                })
            ;
        }])
    ;
}());


