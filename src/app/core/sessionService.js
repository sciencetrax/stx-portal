(function () {
	"use strict";
	var SessionService = Class.extend({
		authorization: null,
		sessionTimeoutMilliseconds: null,
		lastActivityTime: null,
		lastServerUpdateTime: null,
		_processTimer: null,
		_updateServerMilliseconds: 60 * 1000,
		_warningMilliseconds: 50 * 1000,

		$injector: null,
		authorizationContextResolver: null,
		$cookieStore: null,
		$http: null,
		$rootScope: null,
		$timeout: null,

		initialize: function ($injector) {
			this.authorization = null;
			this.sessionTimeoutMilliseconds = null;
			this.lastActivityTime = null;
			this.lastServerUpdateTime = null;
			this._stopProcessTimer = true;

			this.$injector = $injector;

			this.$cookieStore = this.$injector.get('$cookieStore');
			this.$http = this.$injector.get('$http');
			this.$rootScope = this.$injector.get('$rootScope');
			this.$timeout = this.$injector.get('$timeout');
			this.authorizationContextResolver = this.$injector.get('authorizationContextResolver');

			this._stopMonitor();

			var authorization = this.$cookieStore.get(Constants.AuthHeader);
			var sessionTimeoutMilliseconds = this.$cookieStore.get(Constants.SessionTimeoutMilliseconds);
			if (!String.isNullEmptyOrUndefined(authorization)
				&& sessionTimeoutMilliseconds != null) {
				this.authorize(authorization, sessionTimeoutMilliseconds);
			}
		},

		authorize: function (authorization, sessionTimeoutMilliseconds) {
			this.setUpdateServerMilliseconds(sessionTimeoutMilliseconds);
			this.authorization = authorization;
			this.sessionTimeoutMilliseconds = sessionTimeoutMilliseconds;
			this.$http.defaults.headers.common[Constants.AuthHeader] = authorization;
			this.$cookieStore.put(Constants.AuthHeader, authorization);
			this.$cookieStore.put(Constants.SessionTimeoutMilliseconds, sessionTimeoutMilliseconds);
			this._startMonitor();
		},
		authorizeUrl: function (url) {
			if (!this.isAuthorized()) {
				return url;
			}
			return UrlUtils.addParameter(url, Constants.AuthHeader, this.authorization);
		},

		isAuthorized: function () {
			return !String.isNullEmptyOrUndefined(this.authorization);
		},

		removeAuthorization: function () {
			this._stopMonitor();
			if (this.isAuthorized()) {
				var Authorization = this.$injector.get('AuthorizationUpdate');
				var authorization = new Authorization();
				Authorization.remove(authorization);
			}
			this.authorizationContextResolver.reset();
			this.authorization = null;
			this.$http.defaults.headers.common[Constants.AuthHeader] = null;
			this.$cookieStore.remove(Constants.AuthHeader);
			this.$cookieStore.remove(Constants.SessionTimeoutMilliseconds);
		},

		setUpdateServerMilliseconds: function (sessionTimeoutMilliseconds) {
			// > 5 minutes
			if (sessionTimeoutMilliseconds > Constants.millis.minutes5) {
				this._updateServerMilliseconds = Constants.millis.minutes1;
				this._warningMilliseconds = Constants.millis.minutes5;
			} else if (sessionTimeoutMilliseconds > Constants.millis.minutes1) {
				this._updateServerMilliseconds = Constants.millis.seconds30;
				this._warningMilliseconds = Constants.millis.minutes1;
			} else {
				this._updateServerMilliseconds = Constants.millis.seconds1;
				this._warningMilliseconds = Constants.millis.seconds5;
			}
		},

		_warningFired: false,
		_processSession: function () {
			var remainingSeconds = (this.sessionTimeoutMilliseconds / 1000) - this.lastActivityTime.getElapsedSeconds();
			var shouldWarn = remainingSeconds <= this._warningMilliseconds / 1000;
			if (!this._warningFired && shouldWarn) {
				this._warningFired = true;
				this.$rootScope.$broadcast("sessionExpirationWarning");
			} else if (!shouldWarn) {
				this._warningFired = false;
			}
			if (remainingSeconds <= 0) {
				this.removeAuthorization();
				this.$rootScope.$broadcast("sessionExpired");
			} else {
				// Update server if necessary
				if (this.lastServerUpdateTime.getElapsedMilliseconds() >= this._updateServerMilliseconds) {
					var Authorization = this.$injector.get('AuthorizationUpdate');
					var authorization = new Authorization();
					authorization.remainingSeconds = remainingSeconds;
					Authorization.update(authorization);
					this.lastServerUpdateTime = new Date();
				}
			}
			if (this._processTimer != null) {
				this._startProcessTimer();
			}
		},
		_startMonitor: function () {
			var _this = this;
			_this.lastActivityTime = new Date();
			this.lastServerUpdateTime = new Date();
			_this._processSession();

			// setup active user event listeners
			$(window).click(function () {
				_this.lastActivityTime = new Date();
			});
			$(window).keydown(function () {
				_this.lastActivityTime = new Date();
			});

			this._startProcessTimer();
		},
		_startProcessTimer: function () {
			var _this = this;
			_this._processTimer = this.$timeout(function () {
				_this._processSession();
			}, 1000);
		},
		_stopMonitor: function () {
			if (this._processTimer == null) {
				return;
			}
			var processTimer = this._processTimer;
			this._processTimer = null;
			this.$timeout.cancel(processTimer);
			this.lastActivityTime = null;
			this.lastServerUpdateTime = null;
		}
	});

	angular.module('stx.core')
		.provider('session', Class.extend({
			instance: new SessionService(),

			$get: ['$injector',
				function ($injector) {
					this.instance.initialize($injector);
					return this.instance;
				}
			]
		}))
	;
}());
