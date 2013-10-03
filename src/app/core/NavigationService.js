(function () {
	"use strict";
	var NavigationService = Class.extend({
		history: [],
		$location: null,

		initialize: function ($rootScope, $location) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

			});
		},
		init: function () {

		},

		isHome: function() {

		},

		getTargetLocation: function () {
			var targetLocation = this.$location.path();
			if (targetLocation == "/login/login"
				|| targetLocation == "/login") {
				SecurityService.removeAuthorization();
				targetLocation = "/home/index/summary";
			}
			if (targetLocation == "/common/waiting") {
				targetLocation = "/home/index/summary";
			}
			return targetLocation;
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

			$get: ['$rootScope', '$location', function ($rootScope, $location) {
				this.instance.initialize($rootScope, $location);
				return this.instance;
			}]
		}))
	;
}());
