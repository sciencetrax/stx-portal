var SecurityService;
(function () {
    "use strict";
    SecurityService = Class.extend({
        $http: null,
        $cookieStore: null,
        $location: null,
        $rootScope: null,
        AuthorizationContext: null,
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
            var dest = this.$location.path();
            if (dest === "/login") {
                dest = "/";
            }
            this.$rootScope.authorizationContext = this.AuthorizationContext.get({}, function (data) {
                _this.$cookieStore.put(_this.AUTH_HEADER, authorization);
                _this.$location.path(dest);
            });
            _this.$location.path('/waiting');
        },
        handleAuthentication: function () {
            var authorization = this.$cookieStore.get(this.AUTH_HEADER);
            if (authorization == null) {
                this.$location.path('/login');
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

        $get: ['$http', '$location', '$cookieStore', '$rootScope', 'AuthorizationContext', function ($http, $location, $cookieStore, $rootScope, AuthorizationContext) {
            this.instance.$http = $http;
            this.instance.$location = $location;
            this.instance.$cookieStore = $cookieStore;
            this.instance.$rootScope = $rootScope;
            this.instance.AuthorizationContext = AuthorizationContext;
            this.instance.initialize();
            return this.instance;
        }]
    });

    angular.module('stxSecurityService', [
            'ngCookies',
            'stxWebServices'
        ])
        .provider('SecurityService', SecurityServiceProvider);
}());
