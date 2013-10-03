describe('metaValidate directive', function () {
	var $window;
	var $location;
	var $compile;
	var $scope;
	var $rootScope;

	beforeEach(module('stx.core.directives'));

	beforeEach(inject(function (_$window_, _$location_, _$compile_, _$rootScope_) {
		$window = _$window_;
		$location = _$location_;
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$scope.LSPage = new NavigableHash({
			a1: "a1Name"
		});
	}));
	var getElement = function () {
		var element = angular.element('<input meta-validate="meta" />');
		var compiled = $compile(element);
		compiled($scope);
		$scope.$digest();
		return element;
	};
/*
	it('should wait for there to be a value on the scope for', inject(function () {
		$scope.meta = {};
		var element = getElement();
		$scope.meta = { name: "a1" };
		$scope.$apply();
		expect(element.attr('name')).toBe('a1');
	}));
	it('should set the name attribute', inject(function () {
		$scope.meta = { name: "a1" };
		expect(getElement().attr('name')).toBe('a1');
	}));
	it('should set the required attribute', inject(function () {
		$scope.meta = { required: true };
		var element = getElement();
		$scope.$apply();
		expect(element.attr('required')).toBe('true');
	}));
	it('should set the placeholder to the lookup value in LSPage', inject(function () {
		$scope.meta = { name: "a1" };
		expect(getElement().attr('placeholder')).toBe('a1Name');
	}));
	describe('should set the "type" attribute for', function () {
		it('datetime to datetime', inject(function () {
			$scope.meta = { type: "datetime" };
			expect(getElement().attr('type')).toBe('datetime');
		}));
		it('decimal to number', inject(function () {
			$scope.meta = { type: "decimal" };
			expect(getElement().attr('type')).toBe('number');
		}));
		it('double to number', inject(function () {
			$scope.meta = { type: "double" };
			expect(getElement().attr('type')).toBe('number');
		}));
		it('float to number', inject(function () {
			$scope.meta = { type: "float" };
			expect(getElement().attr('type')).toBe('number');
		}));
		it('int to number', inject(function () {
			$scope.meta = { type: "int" };
			expect(getElement().attr('type')).toBe('number');
		}));
		it('text to text', inject(function () {
			$scope.meta = { type: "text" };
			expect(getElement().attr('type')).toBe('text');
		}));
	});
	/**/
});
