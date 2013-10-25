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
        var WebServiceConfig;
        var controller;
        var app;

        beforeEach(function () {
            app = module(moduleName);
        });

        beforeEach(inject(function (_$http_, _$httpBackend_, _$location_, _$cookieStore_, _$controller_, _$rootScope_, _$state_, _WebServiceConfig_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            $cookieStore = _$cookieStore_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $state = _$state_;
            WebServiceConfig = _WebServiceConfig_;
            controller = $controller(controllerName, { $scope: $scope });
            $httpBackend.when('GET', '/StudyTrax/api/portals/' + PORTAL_CODE + "?includeProject=true").respond({ name: "TestPortal" });
            $httpBackend.when('GET', '/StudyTrax/api/authorizationcontext').respond();
            $rootScope.$apply();
        }));

        it('should add $state to the root scope', inject(function () {
            expect($scope.$state).toBe($state);
        }));

        it('should redirect to the original path ("/myPath") once the authorization context is ready', inject(function () {
            $location.path('myPath');
            controller = $controller('ApplicationController', { $scope: $scope });
            $rootScope.$broadcast('authorizationContextReady');
            expect($location.path()).toBe('/myPath');
        }));

        it('should set LS on $scope', inject(function () {
            expect($scope.LS).toBe(LS);
        }));
    });
}());
