(function () {
    var controllerName = 'ViewController';
    var moduleName = 'stx.accounts';

    describe(controllerName, function () {
        var $http;
        var $httpBackend;
        var $rootScope;
        var $scope;
        var $controller;
        var controller;
		var SecurityService;

        beforeEach(module(moduleName));
        beforeEach(inject(function (_$http_, _$httpBackend_, _$rootScope_, _$controller_, _SecurityService_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $controller = _$controller_;
			SecurityService = _SecurityService_;
			SecurityService.authorizationContext = {
				customerId: 100,
				subject: {
					id: 200,
					projects: [
						{projectId: 300, siteId: 400 }
					]
				}
			};
        }));

        it('should add the LSPage variable to the scope', inject(function () {
            expect($scope.LSPage).toBe(LS.pages.home.profile);
        }));
    });
}());
