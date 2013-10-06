(function () {
    "use strict";

    angular.module('stx.reports', [
			'ui.router',
			'stx.core'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('reports', {
                    abstract: true,
                    url: '/reports',
                    views: {
                        'menu': { templateUrl: 'common/secure-menu.tpl.html' },
                        'content': { template: '<div ui-view></div>' }
                    }
                })
				.state('reports.view', {
					url: '/view/:encounterId/:reportId',
					controller: 'ReportsViewController',
					templateUrl: 'reports/view.tpl.html'
				})
            ;
        }])
    ;
}());


