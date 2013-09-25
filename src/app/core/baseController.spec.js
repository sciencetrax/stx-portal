describe('BaseController', function () {
    var $scope;
    var controller;
/*
    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        controller = _$controller_('BaseController', { $scope: $scope });
    }));

    describe('constructor', function () {
        it('should pub LS on the $scope', inject(function () {
            expect($scope.LS).not.toBe(null);
            expect($scope.LS.errorMessages).toBe(LS.errorMessages);
        }));
    });

    describe('handleError', function () {
        it('should lookup the error code in LS and return the error message.', inject(function () {
            controller._handleError({ errorCode: 'AccountLocked'});
            expect(bootbox.alertmessage).toBe(LS.errorMessages.AccountLocked);
        }));
    });
    /**/
});
