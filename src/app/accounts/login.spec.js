var PORTAL_CODE = "test";
describe('LoginController', function () {
    var $http;
    var $httpBackend;
    var $location;
    var $cookieStore;
    var $rootScope;
    var $urlRouter;
    var $scope;
    var $controller;
	var stateExt;
    var Portal;
	var portalResolver;
    var controller;

    beforeEach(module('stx.login.login'));

    beforeEach(inject(function (_$http_, _$httpBackend_, _$location_, _$cookieStore_, _$rootScope_, _$urlRouter_, _$controller_, _stateExt_, _WebServiceConfig_, _Portal_, _portalResolver_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $cookieStore = _$cookieStore_;
        $rootScope = _$rootScope_;
        $urlRouter = _$urlRouter_;
        $scope = $rootScope.$new();
		stateExt = _stateExt_;
        Portal = _Portal_;
		portalResolver = _portalResolver_;
        $controller = _$controller_;

        $rootScope.LS = LS;

		portalResolver.resolve();

        $httpBackend.when('POST', '/api/authorization?portalCode=test&username=UN&password=PW').respond(HttpStatusCodes.ok, { authorization: 'AuthCode' });
        $httpBackend.when('POST', '/api/authorization?portalCode=test&username=UN&password=badPW').respond(HttpStatusCodes.unauthorized, { errorCode: 'InvalidUsernameOrPassword' });
        $httpBackend.when('POST', '/api/authorization?portalCode=test&username=UN&password=expiredPassword').respond(HttpStatusCodes.unauthorized, { errorCode: 'PasswordExpired' });
        $httpBackend.when('GET', '/api/portals/' + PORTAL_CODE + "?includeProject=true").respond({ name: "TestPortal" });
    }));

    describe('constructor', function () {
        beforeEach(inject(function () {
            $http.defaults.headers.common[stateExt.AUTH_HEADER] = 'authToken';
            $cookieStore.put(stateExt.AUTH_HEADER, 'authToken');
            controller = $controller('LoginController', {
                $scope: $scope
            });
            $rootScope.$apply();
            $httpBackend.flush();
        }));

        it('should not be null', inject(function () {
            expect(controller).not.toBe(null);
        }));

        it('should remove the cookie', inject(function () {
            expect($cookieStore.get(stateExt.AUTH_HEADER)).toBe(undefined);
        }));

        it('should remove the auth header', inject(function () {
            expect($http.defaults.headers.common[stateExt.AUTH_HEADER]).toBe(null);
        }));

        describe('$scope', function () {
            it('LSPage should be assigned to the appropriate page resource', inject(function () {
                expect($scope.LSPage).toBe(LS.pages.login.login);
            }));

            it('portal.name should "Test Portal"', inject(function () {
                expect($scope.portal.name).toBe("TestPortal");
            }));

        });
    });
    describe('login', function () {
        beforeEach(inject(function () {
            controller = $controller('LoginController', {
                $scope: $scope
            });
            $scope.authorization.username = 'UN';
            $scope.authorization.password = 'PW';
        }));

        xit('should give an error message when a bad password is provided', inject(function () {
            $scope.authorization.password = 'badPW';
            $scope.login();
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect($scope.error.message).toBe(LS.errorMessages.InvalidUsernameOrPassword);
        }));

        xit('should give an error message when the password is expired', inject(function () {
            $scope.authorization.password = 'expiredPassword';
            $scope.login();
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect($scope.error.message).toBe(LS.errorMessages.PasswordExpired);
        }));
    });
});
