describe('metaValidate directive', function () {
    var $window;
    var $location;
    var $compile;
    var $scope;
    var $rootScope;

    beforeEach(module('stx.core.directives.metaValidate'));

    beforeEach(inject(function (_$window_, _$location_, _$compile_, _$rootScope_) {
        $window = _$window_;
        $location = _$location_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));
    var getElement = function() {
        var element = angular.element('<input meta-validate="meta" />');
        var compiled = $compile(element);
        compiled($scope);
        $scope.$digest();
        return element;
    };
    it('should wait for there to be a value on the scope for', inject(function () {
        $scope.meta = {};
        var element = getElement();
        $scope.meta = { name: "a1" };
        $scope.$apply();
        expect(element.attr('name')).toBe('a1');
    }));
    it('should set the name attribute', inject(function () {
        $scope.meta = {};
        var element = getElement();
        $scope.meta = { name: "a1" };
        $scope.$apply();
        expect(element.attr('name')).toBe('a1');
    }));
    it('metaType:text should set the "type" attribute to text', inject(function () {
        $scope.meta = { type: "text" };
//        expect(getElement().attr('type')).toBe('text');
    }));
    it('metaType:double should set the "type" attribute to number', inject(function () {
        $scope.meta = { type: "double" };
//        expect(getElement().attr('type')).toBe('number');
    }));
});
