(function () {
	"use strict";
	var DependencyResolver = Class.extend({
		$injector: null,
		$state: null,

		initialize: function ($state, $injector) {
			this.$injector = $injector;
			this.$state = $state;
		},

		onStateChangeStart: function (event, toState, toParams, fromState, fromParams) {
			if (event.defaultPrevented
				|| toState.data === undefined
				|| toState.data.depends === undefined) {
				return;
			}
			var _this = this;
			var dependencies = toState.data.depends;
			var canContinue = true;
			for (var index = 0; index < dependencies.length; index++) {
				var dependency = dependencies[index];
				var resolver = this.$injector.get(dependency);
				if (resolver.resolved) {
					continue;
				}
				resolver.resolve().then(function () {
					_this.$state.transitionTo(toState, toParams);
				});
				canContinue = false;
			}
			if (!canContinue) {
				event.preventDefault();
			}
		}
	});

	angular.module('stx.core')
		.provider('dependencyResolver', Class.extend({
			instance: new DependencyResolver(),

			$get: ['$state', '$injector',
				function ($state, $injector) {
					this.instance.initialize($state, $injector);
					return this.instance;
				}
			]
		}))
	;
}());
