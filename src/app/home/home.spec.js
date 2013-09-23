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


    beforeEach(inject(function (_$http_, _$httpBackend_, _$rootScope_, /*_$location_, _$cookieStore_, _$rootScope_,*/ _$controller_) {
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
        $httpBackend.when('GET', '/customers/100/projects/200/sites/500/subjects/300/variablegroupsummaries').respond({ authorization: 'AuthCode' });
        controller = $controller('HomeController', { $scope: $scope });
    }));

    it('should have a dummy test', inject(function () {
        expect(true).toBeTruthy();
    }));
});
