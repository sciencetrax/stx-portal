(function () {
	"use strict";
	var StateExt = Class.extend({
		AUTH_HEADER: "X-Authorization",
		authorizationContextResolver: null,
		authorization: null,
		targetParams: null,
		targetState: null,
		$cookieStore: null,
		$http: null,
		$injector: null,
		$location: null,
		$state: null,

		initialize: function ($cookieStore, $http, $injector, $location, $state, authorizationContextResolver) {
			this.$cookieStore = $cookieStore;
			this.$http = $http;
			this.$injector = $injector;
			this.$location = $location;
			this.$state = $state;
			this.authorizationContextResolver = authorizationContextResolver;

			this.authorization = this.$cookieStore.get(this.AUTH_HEADER);
			this.$http.defaults.headers.common[this.AUTH_HEADER] = this.authorization;
		},

		authorize: function (authorization, navigateAfterAuthorization) {
			navigateAfterAuthorization = navigateAfterAuthorization == null ? true : navigateAfterAuthorization;
			this.authorization = authorization;
			this.$http.defaults.headers.common[this.AUTH_HEADER] = authorization;
			this.$cookieStore.put(this.AUTH_HEADER, authorization);

			if (navigateAfterAuthorization) {
				if (this.targetState == null) {
					this.$location.path('/');
				} else {
					this.$state.transitionTo(this.targetState, this.targetParams);
					this.targetState = null;
					this.targetParams = null;
				}
			}
		},

		authorizeUrl: function (url) {
			return UrlUtils.addParameter(url, this.AUTH_HEADER, this.authorization);
		},

		isAuthorized: function () {
			return this.authorization != null;
		},

		onStateChangeStart: function (event, toState, toParams, fromState, fromParams) {
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

		removeAuthorization: function () {
			this.authorizationContextResolver.reset();
			this.authorization = null;
			this.$http.defaults.headers.common[this.AUTH_HEADER] = null;
			this.$cookieStore.remove(this.AUTH_HEADER);
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
