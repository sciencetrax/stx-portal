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
        init: function () {
        },
        initialize: function() {
            var _this = this;
            this.$rootScope.$on('httpError', function(event, message) {
                _this.handleError(message.status, message.data);
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
        handleAuthentication: function () {
            var authorization;
            try {
                authorization = this.$cookieStore.get(this.AUTH_HEADER);
            } catch (e) {}
            if (authorization == null) {
                this.$rootScope.$broadcast('notAuthorized');
                return;
            }
            this.$cookieStore.remove(this.AUTH_HEADER);
            this.authorize(authorization);
        },
        handleError: function(statusCode, responseData) {
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

        $get: ['$http', '$location', '$cookieStore', '$rootScope', 'authorizationContext', function ($http, $location, $cookieStore, $rootScope, AuthorizationContext) {
            this.instance.$http = $http;
            this.instance.$location = $location;
            this.instance.$cookieStore = $cookieStore;
            this.instance.$rootScope = $rootScope;
            this.instance.AuthorizationContextResource = AuthorizationContext;
            this.instance.initialize();
            return this.instance;
        }]
    });

    angular.module('stx.core.securityService', [
            'ngCookies'
        ])
        .provider('SecurityService', SecurityServiceProvider);
}());
