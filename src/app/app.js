angular.module('stx', [
        'ngResource',
        'templates-app',
        'templates-common',
        'stx.about',
        'stx.account',
        'stx.common',
        'stx.core',
        'stx.home',
        'stx.login',
        'ngCookies',
        'ui.state',
        'ui.route'
    ])
    .factory('SecurityResponseErrorInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
        return {
            responseError: function (rejection) {
                $rootScope.$broadcast('httpError', rejection);
                return $q.reject(rejection);
            }
        };
    }])
    .config(['$httpProvider', '$urlRouterProvider', 'WebServiceConfigProvider', function ($httpProvider, $urlRouterProvider, WebServiceConfigProvider) {
        $httpProvider.interceptors.push('SecurityResponseErrorInterceptor');
        $urlRouterProvider.otherwise('/home/summary');
        WebServiceConfigProvider.setBaseUrl("/StudyTrax/api/");
    }])
    .controller('ApplicationController', ['$scope', '$location', 'SecurityService', function($scope, $location, SecurityService) {
        var targetLocation = $location.path();
        if (targetLocation == "/login"
            || targetLocation == "/waiting") {
            targetLocation = "/";
        }
        $scope.$on('httpError', function(event, message) {
            SecurityService.handleError(message.status, message.data);
        });
        $scope.$on('notAuthorized', function() {
            $location.path('/login');
        });
        $scope.$on('authorizationContextLoading', function() {
            $location.path('/waiting');
        });
        $scope.$on('authorizationContextReady', function() {
            $location.path(targetLocation);
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | ' + LS.appName;
            }
        });

        SecurityService.handleAuthentication();
        $scope.$root.LS = LS;
    }])
;
