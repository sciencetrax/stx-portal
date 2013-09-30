angular.module('stx', [
        'ngResource',
        'ngCookies',
        'ui.router',
        'templates-app',
        'templates-common',
        'stx.about',
        'stx.accounts',
        'stx.common',
        'stx.core',
        'stx.encounters',
        'stx.home',
        'stx.variablegroups'
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
        WebServiceConfigProvider.configure("/StudyTrax", "api/");
    }])
    .controller('ApplicationController', ['$scope', '$window', '$location', 'SecurityService', function($scope, $window, $location, SecurityService) {
        var targetLocation = $location.path();
        if (targetLocation == "/accounts/login"
            || targetLocation == "/common/waiting") {
            targetLocation = "/home/summary";
        }
        $scope.$on('httpError', function(event, message) {
            SecurityService.handleError(message.status, message.data);
        });
        $scope.$on('notAuthorized', function() {
            $location.path('/accounts/login');
        });
        $scope.$on('authorizationContextLoading', function() {
            $location.path('/common/waiting');
        });
        $scope.$on('authorizationContextReady', function() {
            $location.path(targetLocation).replace();
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
