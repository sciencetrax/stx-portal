(function () {
    var controllerName = 'ApplicationController';
    var moduleName = 'stx';

    describe(controllerName, function () {
        var $http;
        var $httpBackend;
        var $location;
        var $cookieStore;
        var $rootScope;
        var $scope;
        var $controller;
        var $state;
        var SecurityService;
        var WebServiceConfig;
        var controller;
        var app;

        beforeEach(function () {
            app = module(moduleName);
        });

        beforeEach(inject(function (_$http_, _$httpBackend_, _$location_, _$cookieStore_, _$controller_, _$rootScope_, _$state_, _WebServiceConfig_, _SecurityService_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            $cookieStore = _$cookieStore_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $state = _$state_;
            SecurityService = _SecurityService_;
            WebServiceConfig = _WebServiceConfig_;
            controller = $controller(controllerName, { $scope: $scope });
            $httpBackend.when('GET', '/StudyTrax/api/portals/' + PORTAL_CODE + "?includeProject=true").respond({ name: "TestPortal" });
            $rootScope.$apply();
        }));

        it('should add $state to the root scope', inject(function () {
            expect($scope.$state).toBe($state);
        }));

        it('should redirect to "/" once the authorization context is ready', inject(function () {
            $rootScope.$broadcast('authorizationContextReady');
            expect($location.path()).toBe('/');
        }));

        it('should redirect to the original path ("/myPath") once the authorization context is ready', inject(function () {
            $location.path('myPath');
            controller = $controller('ApplicationController', { $scope: $scope });
            $rootScope.$broadcast('authorizationContextReady');
            expect($location.path()).toBe('/myPath');
        }));

        it('should redirect to the login page when not authorized', inject(function () {
            expect($location.path()).toBe('/login/login');
        }));

        it('should set LS on $scope', inject(function () {
            expect($scope.LS).toBe(LS);
        }));
    });
}());
