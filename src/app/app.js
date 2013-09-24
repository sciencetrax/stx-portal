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
    .factory('SecurityResponseErrorInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
        return {
            responseError: function (rejection) {
                $rootScope.$broadcast('httpError', rejection);
                /*
                if (rejection.status == HttpStatusCodes.internalServerError) {
                    bootbox.alert(rejection.data);
                } else if (rejection.status == HttpStatusCodes.unauthorized) {
                    this.handleAuthentication();
                }
*/
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