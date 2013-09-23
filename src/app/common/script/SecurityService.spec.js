describe('SecurityService', function () {
    beforeEach(module('stx.SecurityService'));
    beforeEach(function() {
        angular.module('stx.SecurityService')
            .value('baseUrl', '/');
    });

    var $http;
    var $location;
    var $cookieStore;
    var $rootScope;
    var SecurityService;

    beforeEach(inject(function (_$http_, _$location_, _$cookieStore_, _$rootScope_, _SecurityService_) {
        $http = _$http_;
        $location = _$location_;
        $cookieStore = _$cookieStore_;
        $rootScope = _$rootScope_;
        SecurityService = _SecurityService_;

        $http.defaults.headers.common[SecurityService.AUTH_HEADER] = 'authToken';
        $cookieStore.put(SecurityService.AUTH_HEADER, 'authToken');
    }));

    describe('authorize', function () {
        var $httpBackend;
        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $http.defaults.headers.common[SecurityService.AUTH_HEADER] = null;
            $cookieStore.remove(SecurityService.AUTH_HEADER);
            $httpBackend.expectGET('/authorizationcontext').respond(
                { subject: { projects: [ {siteId: 100} ] }
            });
        }));

        it('should set the authorization context', inject(function () {
            SecurityService.authorize('authToken');
            $httpBackend.flush();
            expect($rootScope.authorizationContext).not.toBe(null);
        }));

        it('should set the cookie', inject(function () {
            SecurityService.authorize('authToken');
            $httpBackend.flush();
            expect($cookieStore.get(SecurityService.AUTH_HEADER)).toBe('authToken');
        }));

        it('should set the authorization header', inject(function () {
            SecurityService.authorize('authToken');
            $httpBackend.flush();
            expect($http.defaults.headers.common[SecurityService.AUTH_HEADER]).toBe('authToken');
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
