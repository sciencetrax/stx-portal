angular.module('stx', [
        'ngResource',
        'stxServices',
        'templates-app',
        'templates-common',
        'stx.login',
        'stx.home',
        'ngCookies',
        'ui.state',
        'ui.route'
    ]).
    config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push(function ($rootScope, $location, $q, $log) {
            function success(response) {
                return response;
            }

            function error(response) {
                var status = response.status;
                if (status == HttpResponseCode.internalServerError) {
                    bootbox.alert(response.data);
                    return $q.reject(response);
                }
                if (status == HttpResponseCode.unauthorized) {
                    $rootScope.handleAuthentication();
                    return $q.reject(response); //similar to throw response;
                }
                $log.error('Response status: ' + status + '. ' + response);
                return $q.reject(response); //similar to throw response;
            }

            return function (promise) {
                return promise.then(success, error);
            };
        });
    })

    .config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise( '/home' );
    })
    .run(['$rootScope', "$http", "$cookieStore", "$route", "$location", "AuthorizationContext", function ($rootScope, $http, $cookieStore, $route, $location, AuthorizationContext) {
        $rootScope.authenticate = function (authorization) {
            $http.defaults.headers.common['X-Authorization'] = authorization;
            $rootScope.authorizationContext = AuthorizationContext.get({}, function () {
                var authorizationContext = $rootScope.authorizationContext;
                authorizationContext.siteId = authorizationContext.subject.projects[0].siteId;
                authorizationContext.subjectId = authorizationContext.subject.id;
                $cookieStore.put("authorization", authorization);
                $route.reload();
            });
        };
        $rootScope.handleAuthentication = function () {
            var authorization = $cookieStore.get('authorization');
            if (authorization == null) {
                $location.path('/login');
                return;
            }
            $cookieStore.remove('authorization');
            this.authenticate(authorization);
        };
        $rootScope.handleAuthentication();
    }]);


/*
controller('AppCtrl', function AppCtrl($scope, $location) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
        }
    });
})

;

*/