describe('autofocus directive', function () {
    var $window;
    var $location;
    var $compile;
    var $scope;
    var $rootScope;
    var element;

    beforeEach(module('common.directives.autofocus'));

    beforeEach(inject(function (_$window_, _$location_, _$compile_, _$rootScope_) {
        $window = _$window_;
        $location = _$location_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        element = angular.element('<input autofocus />');
        var compiled = $compile(element);
        compiled($scope);
        $scope.$digest();

    }));

    it('should set autofocus="true"', inject(function () {
        expect(element[0].autofocus).toBe(true);
    }));
});
