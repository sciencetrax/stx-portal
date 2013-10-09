(function () {
	"use strict";
	var StateExt = Class.extend({
		AUTH_HEADER: "X-Authorization",
		authorization: null,
		targetParams: null,
		targetState: null,
		$cookieStore: null,
		$http: null,
		$injector: null,
		$location: null,
		$state: null,

		initialize: function ($cookieStore, $http, $injector, $location, $state) {
			this.$cookieStore = $cookieStore;
			this.$http = $http;
			this.$injector = $injector;
			this.$location = $location;
			this.$state = $state;

			this.authorization = this.$cookieStore.get(this.AUTH_HEADER);
			this.$http.defaults.headers.common[this.AUTH_HEADER] = this.authorization;
		},

		authorize: function(authorization) {
			this.authorization = authorization;
			this.$http.defaults.headers.common[this.AUTH_HEADER] = authorization;
			this.$cookieStore.put(this.AUTH_HEADER, authorization);

			if (this.targetState == null) {
				this.$location.path('/');
			} else {
				this.$state.transitionTo(this.targetState, this.targetParams);
				this.targetState = null;
				this.targetParams = null;
			}
		},

		authorizeUrl: function(url) {
			return UrlUtils.addParameter(url, this.AUTH_HEADER, this.authorization);
		},

		isAuthorized: function() {
			return this.authorization != null;
		},

		onStateChangeStart: function(event, toState, toParams, fromState, fromParams) {
			if (event.defaultPrevented) {
				return;
			}
			var requiresAuthorization = toState.data == null ? false : toState.data.secure;
			if (requiresAuthorization && !this.isAuthorized()) {
				this.targetState = toState;
				this.targetParams = toParams;
				this.$location.path('/login');
				event.preventDefault();
			}
		},

		removeAuthorization: function() {
			this.authorization = null;
			this.$http.defaults.headers.common[this.AUTH_HEADER] = null;
			this.$cookieStore.remove(this.AUTH_HEADER);
		}
	});

	angular.module('stx.core')
		.provider('stateExt', Class.extend({
			instance: new StateExt(),

			$get: ['$cookieStore', '$http', '$injector', '$location', '$state',
				function ($cookieStore, $http, $injector, $location, $state) {
					this.instance.initialize($cookieStore, $http, $injector, $location, $state);
					return this.instance;
				}
			]
		}))
	;
}());
