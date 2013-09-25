var SecurityService;
(function () {
    "use strict";
    SecurityService = Class.extend({
        $http: null,
        $cookieStore: null,
        $location: null,
        $rootScope: null,
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
            var dest = this.$location.path();
            if (dest === "/login") {
                dest = "/";
            }
            this.$rootScope.authorizationContext = this.authorizationContext.get({}, function (data) {
                _this.$cookieStore.put(_this.AUTH_HEADER, authorization);
                _this.$location.path(dest);
                _this.$rootScope.$broadcast('authoricationContextReady');
            });
            _this.$location.path('/waiting');
        },
        getSecurityProfile: function() {
            return {
                customerId: this.authorizationContext.customerId,
                projectId: this.authorizationContext.subject.projects[0].projectId,
                subjectId: this.authorizationContext.subject.id,
                siteId: this.authorizationContext.subject.projects[0].siteId,
                userId: this.authorizationContext.userId
            };
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

        $get: ['$http', '$location', '$cookieStore', '$rootScope', 'authorizationContext', function ($http, $location, $cookieStore, $rootScope, AuthorizationContext) {
            this.instance.$http = $http;
            this.instance.$location = $location;
            this.instance.$cookieStore = $cookieStore;
            this.instance.$rootScope = $rootScope;
            this.instance.authorizationContext = AuthorizationContext;
            this.instance.initialize();
            return this.instance;
        }]
    });

    angular.module('stx.core.securityService', [
            'ngCookies'
        ])
        .provider('SecurityService', SecurityServiceProvider);
}());
