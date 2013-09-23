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
        authorize: function (authorization) {
            var _this = this;
            this.$http.defaults.headers.common['X-Authorization'] = authorization;
            this.$rootScope.authorizationContext = this.AuthorizationContext.get({}, function (data) {
                _this.$cookieStore.put(_this.AUTH_HEADER, authorization);
            });
        },
        handleAuthentication: function () {
            var authorization = this.$cookieStore.get('authorization');
            if (authorization == null) {
                this.$location.path('/login');
                return;
            }
            $cookieStore.remove('authorization');
            this.authenticate(authorization);
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
            return this.instance;
        }]
    });

    angular.module('stx.SecurityService', [
            'ngCookies',
            'stx.webServices'
        ])
        .provider('SecurityService', SecurityServiceProvider);

}());
