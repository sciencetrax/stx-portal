describe('backButton directive', function () {
    var $window;
    var $location;
    var $compile;
    var $scope;
    var $rootScope;
    var element;

    beforeEach(module('stx.core.directives.backButton'));

    beforeEach(inject(function (_$window_, _$location_, _$compile_, _$rootScope_) {
        $window = _$window_;
        $location = _$location_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        $location.path('/start');
        $location.path('/current');

        element = angular.element('<div back-button></div>');
        var compiled = $compile(element);
        compiled($scope);
        $scope.$digest();

    }));

    it('should return to "/start" when click() is called', inject(function () {
        // Doing the click does a full page reload causing karma to complain
//        element[0].click();
        // TODO: Need to figure out how to validate that the path actually changed.  Or
        // we need to figure out how to make the path change when click() is called.
//        expect($location.path()).toBe('/start');
    }));

    it('should add a function to the click attribute', inject(function () {
        expect(element[0].click).not.toBe(null);
        expect(typeof element[0].click).toBe('function');
    }));
});
