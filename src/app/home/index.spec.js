(function () {
    var moduleName = 'stx.home.index';
    var controllerName = 'IndexController';

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
            $httpBackend.when('GET', '/api/portals/' + PORTAL_CODE + "?includeProject=true").respond({ name: "TestPortal" });
            $httpBackend.when('GET', '/api/customers/100/projects/300/sites/400/subjects/200/scheduledencounters').respond(HttpStatusCodes.ok, [
                { name: 'Baseline' },
                { name: 'Month 1' },
                { name: 'Month 2' },
                { name: 'Month 3' }
            ]);
            $httpBackend.expect('GET', '/api/customers/100/projects/300/sites/400/subjects/200/variablegroupsummaries').respond(HttpStatusCodes.ok, [
                { percentComplete: 0.1 },
                { percentComplete: 0.2 },
                { percentComplete: 1 }
            ]);

            controller = $controller(controllerName, { $scope: $scope });
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
        }));

        it('should add the LSPage variable to the scope', inject(function () {
            expect($scope.LSPage).toBe(LS.pages.home.index);
        }));

        it('should add 3 variable groups to the scope', inject(function () {
            expect($scope.projectVariableGroups.length).toBe(3);
        }));

        it('should add 4 encounters to the scope', inject(function () {
            expect($scope.encounters.length).toBe(4);
        }));

        it('should add 2 incomplete variable groups to the scope', inject(function () {
            expect($scope.incompleteSummaries.length).toBe(2);
        }));
    });
}());
