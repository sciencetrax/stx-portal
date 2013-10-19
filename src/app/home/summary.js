(function () {
    "use strict";
    angular.module('stx.home')
        .controller("HomeSummaryController", ['$scope', 'portalResolver',
            function ($scope, portalResolver) {
                $scope.LSPage = LS.pages.home.index.summary;
                $scope.encounterActions = portalResolver.data.creatableNonFixedIntervals;

				$scope.incompleteSubjectEncounters = function (item) {
					return item.percentComplete < 0.999
						&& (item.viewable || item.creatable || item.editable);

				};
			}])
    ;
}());


