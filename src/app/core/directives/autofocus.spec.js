describe('autofocus directive', function () {
    var $window;
    var $location;
    var $compile;
    var $scope;
    var $rootScope;
    var element;

    beforeEach(module('stx.core.directives'));

    beforeEach(inject(function (_$window_, _$location_, _$compile_, _$rootScope_) {
        $window = _$window_;
        $location = _$location_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        element = angular.element('<input st-autofocus />');
        var compiled = $compile(element);
        compiled($scope);
        $scope.$digest();

    }));

    xit('should set the focus to the last element with this tag', inject(function () {
        // Not sure how to test this
    }));
});
