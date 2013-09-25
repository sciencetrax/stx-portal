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
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('SecurityResponseErrorInterceptor');
    }])
    .config(function myAppConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/summary');
    })
    .config(function myAppConfig(WebServiceConfigProvider) {
        WebServiceConfigProvider.setBaseUrl("/StudyTrax/api/");
    })
    .controller('ApplicationController', ['$scope', 'SecurityService', function ApplicationController($scope, SecurityService) {
        $scope.$root.LS = LS;
        this.$rootScope.$on('httpError', function(event, message) {
            SecurityService.handleError(message.status, message.data);
        });
        $scope.$on('authorizationContextReady', function(event, message) {
        });
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | StudyTrax';
            }
        });
    }])
    .run(['SecurityService', function (SecurityService) {
        SecurityService.handleAuthentication();
    }])

;
