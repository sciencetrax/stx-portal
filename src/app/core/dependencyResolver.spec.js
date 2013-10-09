describe('dependencyResolver', function () {
	beforeEach(module('stx.core'));
	var app = angular.module('stx.core');
	var $httpBackend;
	var $rootScope;
	var $state;
	var dependencyResolver;
	var event;
	var toState;
	var toParams;

	app.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('test', {
				url: '/test',
				template: '<div ui-view></div>',
				data: {
					depends: []
				}
			})
		;
	}]);

	beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$state_, _dependencyResolver_) {
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		$state = _$state_;
		dependencyResolver = _dependencyResolver_;
		event = {
			prevented: false,
			preventDefault: function () {
				this.prevented = true;
			}
		};

		toState = $state.get('test');
		$httpBackend.when('GET', '/api/portals/' + PORTAL_CODE + "?includeProject=true").respond({ name: "TestPortal" });
	}));

	describe('onStateChangeStart', function () {
		beforeEach(inject(function () {
		}));

		xit('should exit if no dependencies are set', inject(function () {
			dependencyResolver.onStateChangeStart(event, toState, toParams);
			expect(event.prevented).toBe(false);
			event.data = null;
			dependencyResolver.onStateChangeStart(event, toState, toParams);
			expect(event.prevented).toBe(false);
		}));

		it('should stop the transition when a resolution needs to occur', inject(function () {
			toState.data.depends.push('portalResolver');
			dependencyResolver.onStateChangeStart(event, toState, toParams);
			expect(event.prevented).toBe(true);
			expect($state.current.name).toBe("");
		}));

		it('should transition after resolution', inject(function () {
			toState.data.depends.push('portalResolver');
			dependencyResolver.onStateChangeStart(event, toState, toParams);
			$rootScope.$apply(); // fix for angular 1.1.4
			$httpBackend.flush();
			expect($state.current.name).toBe("test");
		}));
	});
});
