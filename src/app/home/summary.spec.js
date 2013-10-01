(function () {
    var moduleName = 'stx.home';
    var controllerName = 'SummaryController';

    describe(controllerName, function () {
        var $http;
        var $httpBackend;
        var $rootScope;
        var $scope;
        var $controller;
        var controller;

        beforeEach(module(moduleName));
        beforeEach(inject(function (_$http_, _$httpBackend_, _$rootScope_, _$controller_, _$state_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $controller = _$controller_;
            controller = $controller(controllerName, { $scope: $scope });
            $httpBackend.when('GET').respond();
            _$state_.go('home.index.summary');
            $rootScope.$apply();
        }));

        it('should add the LSPage variable to the scope', inject(function () {
            expect($scope.LSPage).toBe(LS.pages.home.index.summary);
        }));
    });
}());
