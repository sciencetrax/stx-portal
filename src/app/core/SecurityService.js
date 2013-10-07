var SecurityService;
(function () {
    "use strict";
    SecurityService = Class.extend({
        $http: null,
        $cookieStore: null,
        $location: null,
        $rootScope: null,
        AuthorizationContextResource: null,
        authorization: null,
        authorizationContext: null,
        AUTH_HEADER: "X-Authorization",
        portal: null,
        Portal: null,

        init: function () {
        },
        initialize: function () {
			var _this = this;
            this.portal = this.Portal.get({
                code: PORTAL_CODE,
                includeProject: true
            }, function() {
				_this.$rootScope.$broadcast('portalReady');
			});
        },
        authorize: function (authorization) {
            var _this = this;
            this.$http.defaults.headers.common[this.AUTH_HEADER] = authorization;
            _this.$rootScope.$broadcast('authorizationContextLoading');
            this.AuthorizationContextResource.get({}, function (data) {
                _this.authorization = authorization;
                _this.authorizationContext = data;
                // We want to wait for success before we put the cookie.  This
                // ensures that the authorization is valid before we remember it.
                _this.$cookieStore.put(_this.AUTH_HEADER, authorization);
                _this.$rootScope.$broadcast('authorizationContextReady');
            });
        },
		authorizeUrl: function(url) {
			return UrlUtils.addParameter(url, this.AUTH_HEADER, this.authorization);
		},
        handleAuthentication: function () {
            var authorization;
            try {
                authorization = this.$cookieStore.get(this.AUTH_HEADER);
            } catch (e) {
            }
            if (authorization == null) {
                this.$rootScope.$broadcast('notAuthorized');
                return;
            }
            this.$cookieStore.remove(this.AUTH_HEADER);
            this.authorize(authorization);
        },
        handleError: function (statusCode, responseData) {
            if (statusCode == HttpStatusCodes.internalServerError) {
                bootbox.alert(responseData);
            } else if (statusCode == HttpStatusCodes.unauthorized) {
                this.handleAuthentication();
            }
        },
        removeAuthorization: function () {
            this.$cookieStore.remove(this.AUTH_HEADER);
            this.$http.defaults.headers.common[this.AUTH_HEADER] = null;
        }
    });

    var SecurityServiceProvider = Class.extend({
        instance: new SecurityService(),

        $get: ['$http', '$location', '$cookieStore', '$rootScope', 'authorizationContext', 'Portal',
            function ($http, $location, $cookieStore, $rootScope, AuthorizationContext, Portal) {
                this.instance.$http = $http;
                this.instance.$location = $location;
                this.instance.$cookieStore = $cookieStore;
                this.instance.$rootScope = $rootScope;
                this.instance.AuthorizationContextResource = AuthorizationContext;
                this.instance.Portal = Portal;
                this.instance.initialize();
                return this.instance;
            }]
    });

    angular.module('stx.core.securityService', [
            'ngCookies'
        ])
        .provider('SecurityService', SecurityServiceProvider);
}());
