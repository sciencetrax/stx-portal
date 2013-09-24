angular.module('stx', [
        'ngResource',
        'stxWebServices',
        'templates-app',
        'templates-common',
        'stx.login',
        'stx.home',
        'ngCookies',
        'ui.state',
        'ui.route'
    ])
    .factory('SecurityResponseErrorInterceptor', ['$q', function ($q) {
        return {
            requestError: function (rejection) {
                // This is a horrible hack.  Problem is that injecting SecurityService will
                // cause a CircularDependency error because ServiceLocator uses $http.
                SecurityService.instance.handleHttpError(response.status, response.data);
                return $q.reject(rejection);
            },
            responseError: function (rejection) {
                // This is a horrible hack.  Problem is that injecting SecurityService will
                // cause a CircularDependency error because ServiceLocator uses $http.
                SecurityService.instance.handleHttpError(response.status, response.data);
                return $q.reject(rejection);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('SecurityResponseErrorInterceptor');
    }])
    .config(function myAppConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })
    .config(function myAppConfig(WebServiceConfigProvider) {
        WebServiceConfigProvider.setBaseUrl("/StudyTrax/api/");
    })
    .run(["SecurityService", function (SecurityService) {
        SecurityService.handleAuthentication();
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