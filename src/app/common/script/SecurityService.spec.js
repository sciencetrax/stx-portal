describe('SecurityService', function () {
    beforeEach(module('stxSecurityService'));
    var $http;
    var $httpBackend;
    var $location;
    var $cookieStore;
    var $rootScope;
    var SecurityService;

    beforeEach(inject(function (_$http_, _$httpBackend_, _$location_, _$cookieStore_, _$rootScope_, _SecurityService_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $cookieStore = _$cookieStore_;
        $rootScope = _$rootScope_;
        SecurityService = _SecurityService_;

        $http.defaults.headers.common[SecurityService.AUTH_HEADER] = 'authToken';
        $cookieStore.put(SecurityService.AUTH_HEADER, 'authToken');
        $httpBackend.when('GET', '/api/authorizationcontext').respond({ subject: { projects: [ {siteId: 100} ] }});
    }));

    describe('authorize', function () {
        beforeEach(inject(function () {
            $http.defaults.headers.common[SecurityService.AUTH_HEADER] = null;
            $cookieStore.remove(SecurityService.AUTH_HEADER);
        }));

        it('should set the authorization context', inject(function () {
            SecurityService.authorize('authToken');
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect($rootScope.authorizationContext).not.toBe(null);
        }));

        it('should set the cookie', inject(function () {
            SecurityService.authorize('authToken');
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect($cookieStore.get(SecurityService.AUTH_HEADER)).toBe('authToken');
        }));

        it('should set the authorization header', inject(function () {
            SecurityService.authorize('authToken');
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
            expect($http.defaults.headers.common[SecurityService.AUTH_HEADER]).toBe('authToken');
        }));
    });
    describe('handleAuthentication (not authenticated)', function () {
        beforeEach(inject(function () {
            $http.defaults.headers.common[SecurityService.AUTH_HEADER] = null;
            $cookieStore.remove(SecurityService.AUTH_HEADER);
            SecurityService.handleAuthentication();
        }));

        it('should redirect to the login page', inject(function () {
            expect($location.path()).toBe('/login');
        }));
    });

    describe('handleAuthentication (authenticated)', function () {
        beforeEach(inject(function () {
            $cookieStore.put(SecurityService.AUTH_HEADER, "authToken");
            SecurityService.handleAuthentication();
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
        }));

        it('should redirect to the login page', inject(function () {
            expect($location.path()).toBe('/');
        }));
    });

    describe('removeAuthorization', function () {
        beforeEach(inject(function () {
            $http.defaults.headers.common[SecurityService.AUTH_HEADER] = 'authToken';
            $cookieStore.put(SecurityService.AUTH_HEADER, 'authToken');
        }));

        it('should remove the cookie', inject(function () {
            SecurityService.removeAuthorization();
            expect($cookieStore.get(SecurityService.AUTH_HEADER)).toBe(undefined);
        }));

        it('should remove the authorization header', inject(function () {
            SecurityService.removeAuthorization();
            expect($http.defaults.headers.common[SecurityService.AUTH_HEADER]).toBe(null);
        }));
    });
});
