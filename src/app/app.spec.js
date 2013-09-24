describe('App', function () {
    var $http;
    var $httpBackend;
    var $location;
    var $cookieStore;
    var $rootScope;
    var SecurityService;
    var WebServiceConfig;
    var app;

    beforeEach(function () {
        app = module('stx');
    });

    beforeEach(inject(function (_$http_, _$httpBackend_, _$location_, _$cookieStore_, _$rootScope_, _WebServiceConfig_, _SecurityService_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $cookieStore = _$cookieStore_;
        $rootScope = _$rootScope_;
        SecurityService = _SecurityService_;
        WebServiceConfig = _WebServiceConfig_;
    }));

    describe('run (not authenticated)', function () {
        it('should set the baseUrl for the web services config', inject(function () {
            expect(WebServiceConfig.getBaseUrl()).toBe('/StudyTrax/api/');
        }));

        it('should redirect to the login page', inject(function () {
            expect($location.path()).toBe('/login');
        }));
    });
});
