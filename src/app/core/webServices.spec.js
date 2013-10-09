describe('webServices', function () {
    beforeEach(module('stx.core.webService'));
    var $http;
    var $httpBackend;
    var $rootScope;
    beforeEach(inject(function (_$http_, _$httpBackend_, _$rootScope_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    describe('DataEntryForm', function () {
        var DataEntryForm;
        beforeEach(inject(function (_DataEntryForm_) {
            DataEntryForm = _DataEntryForm_;
            $httpBackend.when('GET', '/Areas/app/WebForms/SubjectHome/DataEntry.aspx?intervalId=300&portalId=200&projectId=100&variableGroupId=500').respond(HttpStatusCodes.ok, "<form></form>");
        }));
        it('get', inject(function () {
            DataEntryForm.get(100, 200, 300, null, 500).success(function(data) {
                expect(data).toBe("<form></form>");
            });
            $rootScope.$apply(); // fix for angular 1.1.4
            $httpBackend.flush();
        }));

    });
});
