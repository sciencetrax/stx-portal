describe('LoginController', function () {
    var $http;
    var $httpBackend;
    var $location;
    var $cookieStore;
    var $rootScope;
    var $urlRouter;
    var $scope;
    var $controller;
    var SecurityService;
    var LoginController;

    beforeEach(module('stx.login'));

    beforeEach(inject(function (_$http_, _$httpBackend_, _$location_, _$cookieStore_, _$rootScope_, _$urlRouter_, _$controller_, _WebServiceConfig_, _SecurityService_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $cookieStore = _$cookieStore_;
        $rootScope = _$rootScope_;
        $urlRouter = _$urlRouter_;
        $scope = $rootScope.$new();
        SecurityService = _SecurityService_;
        $controller = _$controller_;

        $rootScope.LS = LS;

        $httpBackend.when('POST', '/api/authorization?portalCode=pt&username=UN&password=PW').respond(HttpStatusCodes.ok, { authorization: 'AuthCode' });
        $httpBackend.when('POST', '/api/authorization?portalCode=pt&username=UN&password=badPW').respond(HttpStatusCodes.unauthorized, { errorCode: 'InvalidUsernameOrPassword' });
        $httpBackend.when('GET', '/api/authorizationcontext').respond({ userId: 101 });
    }));

    describe('constructor', function () {
        beforeEach(inject(function (_$http_, _$location_, _$cookieStore_, _$rootScope_, $controller, _SecurityService_) {
            $http.defaults.headers.common[SecurityService.AUTH_HEADER] = 'authToken';
            $cookieStore.put(SecurityService.AUTH_HEADER, 'authToken');
            LoginController = $controller('LoginController', {
                $scope: $scope
            });
        }));

        it('should not be null', inject(function () {
            expect(LoginController).not.toBe(null);
        }));
        it('should remove the cookie', inject(function () {
            expect($cookieStore.get(SecurityService.AUTH_HEADER)).toBe(undefined);
        }));

        it('should remove the auth header', inject(function () {
            expect($http.defaults.headers.common[SecurityService.AUTH_HEADER]).toBe(null);
        }));
    });
    describe('login', function () {
        beforeEach(inject(function () {
            LoginController = $controller('LoginController', {
                $scope: $scope
            });
            $scope.authorization.username = 'UN';
            $scope.authorization.password = 'PW';
        }));

        it('should set authorization context', inject(function () {
            $scope.login();
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect($rootScope.authorizationContext).not.toBe(null);
            expect($rootScope.authorizationContext.userId).toBe(101);
        }));

        it('should redirect to "/" on successful login', inject(function () {
            $scope.login();
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect($location.path()).toBe('/');
        }));

        it('should bootbox is used to display error messages when an http error occurs', inject(function () {
            $scope.authorization.password = 'badPW';
            $scope.login();
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect(bootbox.alertmessage).toBe(LS.errorMessages.InvalidUsernameOrPassword);
        }));
    });
});
