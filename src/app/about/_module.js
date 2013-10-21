(function () {
	"use strict";

	angular.module('stx.about', [
			'ui.router',
			'ui.validate',
			'stx.core'
		])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				.state('about', {
					abstract: true,
					url: '/about',
					views: {
						'menu': { templateUrl: 'common/menu/secure-menu.tpl.html' },
						'content': { template: '<div ui-view></div>' }
					}
				})
				.state('about.index', {
					url: '/index',
					views: {
						'menu@': { templateUrl: 'common/menu/secure-menu.tpl.html' },
						'': {
							controller: 'AboutIndexController',
							templateUrl: 'about/index.tpl.html',
							data: { pageTitle: 'About' }
						}
					}
				})
			;
		}])
	;
}());


