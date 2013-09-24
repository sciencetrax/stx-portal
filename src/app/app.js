angular.module('stx', [
        'ngResource',
        'stxWebServices',
        'templates-app',
        'templates-common',
        'stx.about',
        'stx.account',
        'stx.common',
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
    .controller('ApplicationController', ['$scope', function ApplicationController($scope) {
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
