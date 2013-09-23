describe('HomeController', function () {
    var $http;
    var $httpBackend;
    var $rootScope;
    var $scope;
    var $controller;
    var controller;

    beforeEach(module('stx.home'));

    beforeEach(function() {
        angular.module('stx.webServices')
            .value('baseUrl', '/');
    });


    beforeEach(inject(function (_$http_, _$httpBackend_, _$rootScope_, _$controller_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $rootScope.authorizationContext = {
            customerId: 100,
            projectId: 200,
            subject: {
                id: 300,
                projects: [
                    {projectId: 400, siteId: 500 }
                ]
            }
        };
        $httpBackend.when('GET', '/customers/100/projects/200/sites/500/subjects/300/scheduledencounters').respond(HttpStatusCodes.ok, [
            { name: 'Baseline' },
            { name: 'Month 1' },
            { name: 'Month 2' },
            { name: 'Month 3' }
        ]);
        $httpBackend.when('GET', '/customers/100/projects/200/sites/500/subjects/300/variablegroupsummaries').respond(HttpStatusCodes.ok, [
            { percentComplete: 0.1 },
            { percentComplete: 0.2 },
            { percentComplete: 1 }
        ]);
        controller = $controller('HomeController', { $scope: $scope });
        $httpBackend.flush();
    }));

    it('should add 3 variable groups to the scope', inject(function () {
        expect($scope.projectVariableGroups.length).toBe(3);
    }));

    it('should add 4 encounters to the scope', inject(function () {
        expect($scope.encounters.length).toBe(4);
    }));

    it('should add 2 incomplete variable groups to the scope', inject(function () {
        expect($scope.incompleteProjectVariableGroups.length).toBe(2);
    }));
});
