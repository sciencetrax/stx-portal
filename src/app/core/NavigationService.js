(function () {
	"use strict";
	var NavigationService = Class.extend({
		history: [],

		initialize: function ($rootScope, $state) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

			});
		},
		go: function () {

		},

		back: function () {
			this.$window.history.back();
		}
	});

	angular.module('stx.core')
		.provider('$navigation', Class.extend({
			instance: new NavigationService(),

			$get: ['$rootScope', function ($rootScope) {
				this.instance.initialize($rootScope);
				return this.instance;
			}]
		}))
	;
}());
