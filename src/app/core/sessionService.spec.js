describe('session', function () {
	beforeEach(module('stx.core'));

	var $injector;
	var $http;
	var $httpBackend;
	var $timeout;
	var $cookieStore;
	var $rootScope;
	var session;

	beforeEach(inject(function (_$injector_, _$http_, _$httpBackend_, _$timeout_,  _$rootScope_, _$cookieStore_, _session_) {
		$injector = _$injector_;
		$http = _$http_;
		$httpBackend = _$httpBackend_;
		$timeout = _$timeout_;
		$rootScope = _$rootScope_;
		$cookieStore = _$cookieStore_;
		session = _session_;
		session.initialize($injector);

		$httpBackend.when('PUT', '/api/authorization?portalCode=&username=&password=').respond({
		});
		$httpBackend.when('PUT', '/api/authorization?remainingSeconds=0.005').respond({
		});
	}));

	describe('on initialization', function () {
		it('authorization should be undefined', inject(function () {
			expect(session.authorization).toBe(null);
		}));
		it('authorization should be set to the cookie value', inject(function () {
			$cookieStore.put(Constants.AuthHeader, "authorized");
			$cookieStore.put(Constants.SessionTimeoutMilliseconds, 5);
			session.initialize($injector);
			expect(session.authorization).toBe("authorized");
		}));
		it('sessionTimeoutSeconds should be set to the cookie value', inject(function () {
			$cookieStore.put(Constants.AuthHeader, "authorized");
			$cookieStore.put(Constants.SessionTimeoutMilliseconds, 5);
			session.initialize($injector);
			expect(session.sessionTimeoutMilliseconds).toBe(5);
		}));
		it('$http AuthHeader should be set to the cookie value', inject(function () {
			$cookieStore.put(Constants.AuthHeader, "authorized");
			$cookieStore.put(Constants.SessionTimeoutMilliseconds, 5);
			session.initialize($injector);
			expect($http.defaults.headers.common[Constants.AuthHeader]).toBe("authorized");
		}));
	});

	describe('_startMonitor', function () {
		beforeEach(inject(function () {
			session.authorize("authorized", 5);
		}));

		it('should set the lastActivityTime immediately', inject(function () {
			expect(session.lastActivityTime.getElapsedSeconds()).toBeCloseTo(0);
		}));
		it('should set the lastServerUpdateTime immediately', inject(function () {
			expect(session.lastServerUpdateTime.getElapsedSeconds()).toBeCloseTo(0);
		}));
		it('should update the server after the _updateServerMilliseconds have elapsed', inject(function () {
			session.lastServerUpdateTime = session.lastServerUpdateTime.addSeconds(-1 * (session._updateServerMilliseconds * 1000) + 1);
			$timeout.flush();
			expect(session.lastServerUpdateTime.getElapsedSeconds()).toBeCloseTo(0);
		}));
		it('should reset the timer after execution', inject(function () {
			$timeout.flush();
			expect(session._processTimer).not.toBe(null);
		}));
		it('should not reset the timer after execution if the timer is being stopped', inject(function () {
			session._stopMonitor();
			expect(session._processTimer).toBe(null);
		}));
	});

	describe('_stopMonitor', function () {
		beforeEach(inject(function () {
			session.authorize("authorized", 5);
		}));

		it('should null out _processTimer after stopping', inject(function () {
			session._stopMonitor();
			expect(session._processTimer).toBe(null);
		}));
	});

	describe('authorize', function () {
		beforeEach(inject(function () {
			session.authorize("authorized", 5);
		}));

		it('should set the authorization attribute', inject(function () {
			expect(session.authorization).toBe("authorized");
		}));
		it('should set the authorization cookie', inject(function () {
			expect($cookieStore.get(Constants.AuthHeader)).toBe("authorized");
		}));
		it('should set the $http AuthHeader cookie', inject(function () {
			expect($http.defaults.headers.common[Constants.AuthHeader]).toBe("authorized");
		}));
		it('should start the monitor', inject(function () {
			expect(session._processTimer).not.toBe(null);
		}));
	});
	describe('authorizeUrl', function () {
		it('should not add the AuthHeader as a parameter when not authorized', inject(function () {
			expect(session.authorizeUrl("http://localhost/index.html")).toBe("http://localhost/index.html");
		}));
		it('should add the AuthHeader parameter when there are no parameters defined', inject(function () {
			session.authorize("authorized");
			expect(session.authorizeUrl("http://localhost/index.html")).toBe("http://localhost/index.html?" + Constants.AuthHeader + "=authorized");
			expect(session.authorizeUrl("http://localhost/index.html?")).toBe("http://localhost/index.html?" + Constants.AuthHeader + "=authorized");
		}));
		it('should append the AuthHeader parameter to the existing parameters', inject(function () {
			session.authorize("authorized");
			expect(session.authorizeUrl("http://localhost/index.html?p1=one")).toBe("http://localhost/index.html?p1=one&" + Constants.AuthHeader + "=authorized");
			expect(session.authorizeUrl("http://localhost/index.html?p1=one&")).toBe("http://localhost/index.html?p1=one&" + Constants.AuthHeader + "=authorized");
		}));
	});
	describe('isAuthorized', function () {
		it('should be false initially', inject(function () {
			expect(session.isAuthorized()).toBe(false);
		}));
		it('should be true after authorization', inject(function () {
			session.authorize("authorized", 5);
			expect(session.isAuthorized()).toBe(true);
		}));
	});
	describe('removeAuthorization', function () {
		beforeEach(inject(function () {
			session.authorize("authorized", 5);
			session.removeAuthorization();
		}));

		it('should remove the authorization attribute', inject(function () {
			expect(session.authorization).toBe(null);
		}));
		it('should remove the authorization cookie', inject(function () {
			// cookies are undefined once removed, not null
			expect($cookieStore.get(Constants.AuthHeader)).toBe(undefined);
		}));
		it('should remove the $http AuthHeader cookie', inject(function () {
			expect($http.defaults.headers.common[Constants.AuthHeader]).toBe(null);
		}));
		it('should stop the monitor', inject(function () {
			expect(session._processTimer).toBe(null);
		}));
	});
});
