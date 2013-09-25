(function () {
    "use strict";
    angular.module('stx.home.incompleteVariableGroupSummaries', [
            'stx.core',
            'ui.state'
        ])
        .filter('incompleteVariableGroupSummaries', function () {
            return function (summaries) {
                var incompleteSummaries = [];
                for (var index = 0; index < summaries.length; index++) {
                    var group = summaries[index];
                    if (group.percentComplete == null
                        || group.percentComplete < 0.9999) {
                        incompleteSummaries.push(group);
                    }
                }
                return incompleteSummaries;
            };
        })
    ;
}());


