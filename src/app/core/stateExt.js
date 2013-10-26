(function () {
	"use strict";
	var StateExt = Class.extend({
		excludeNextStateChangeFromHistory: false,
		targetParams: null,
		targetState: null,
		$injector: null,
		$location: null,
		$state: null,
		session: null,
		history: [],

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

		back: function (state, params) {
			this.excludeNextStateChangeFromHistory = true;
			if (this.history.length < 1) {
				if (state == null) {
					this.$injector.get('$window').history.back();
				} else {
					this.$state.go(state, params);
				}
				return;
			}
			var to = this.history.pop();
			this.$state.go(to.state, to.params);
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
			} else {
//				this.$injector.get('$rootScope').pageReady = false;
			}
		},

		onStateChangeSuccess: function (event, toState, toParams, fromState, fromParams) {
			var historyMode = fromState.data == null ? "" : fromState.data.history;
			if (fromState.abstract
				|| historyMode == 'exclude'
				|| this.excludeNextStateChangeFromHistory) {
				this.excludeNextStateChangeFromHistory = false;
				return;
			}
			if (historyMode == 'reset') {
				this.history = [];
			}
			this.history.push({
				state: fromState,
				params: fromParams
			});
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
