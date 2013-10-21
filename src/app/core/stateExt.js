(function () {
	"use strict";
	var StateExt = Class.extend({
		targetParams: null,
		targetState: null,
		$injector: null,
		$location: null,
		$state: null,
		session: null,

		initialize: function ($cookieStore, $http, $injector, $location, $state, authorizationContextResolver) {
			this.$injector = $injector;
			this.$location = $location;
			this.$state = $state;
			this.session = $injector.get('session');
		},

		authorizeAndNavigate: function (authorization, sessionTimeoutSeconds) {
			this.session.authorize(authorization, sessionTimeoutSeconds);
			if (this.targetState == null) {
				this.$location.path('/');
			} else {
				this.$state.transitionTo(this.targetState, this.targetParams);
				this.targetState = null;
				this.targetParams = null;
			}
		},

		onStateChangeStart: function (event, toState, toParams, fromState, fromParams) {
			if (event.defaultPrevented) {
				return;
			}
			var requiresAuthorization = toState.data == null ? false : toState.data.secure;
			if (requiresAuthorization && !this.session.isAuthorized()) {
				this.targetState = toState;
				this.targetParams = toParams;
				this.$location.path('/login');
				event.preventDefault();
			}
		}
	});

	angular.module('stx.core')
		.provider('stateExt', Class.extend({
			instance: new StateExt(),

			$get: ['$cookieStore', '$http', '$injector', '$location', '$state', 'authorizationContextResolver',
				function ($cookieStore, $http, $injector, $location, $state, authorizationContextResolver) {
					this.instance.initialize($cookieStore, $http, $injector, $location, $state, authorizationContextResolver);
					return this.instance;
				}
			]
		}))
	;
}());
