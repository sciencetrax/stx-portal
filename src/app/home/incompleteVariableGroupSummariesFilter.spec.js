describe('incompleteVariableGroupSummaries', function () {
    var $filter;
    var result;

    beforeEach(module('stx.home.incompleteVariableGroupSummaries'));
    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
        var summaries = [
            { percentComplete: 0.1 },
            { percentComplete: 0.2 },
            { percentComplete: 1 },
            { percentComplete: null },
            { }
        ];
        result = $filter('incompleteVariableGroupSummaries')(summaries);
    }));

    it('should select 4 f the 5 variable group summaries', inject(function () {
        expect(result.length).toBe(4);
    }));
});
