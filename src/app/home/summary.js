(function () {
    "use strict";
    angular.module('stx.home')
        .controller("HomeSummaryController", ['$scope',
            function ($scope) {
                $scope.LSPage = LS.pages.home.index.summary;
                $scope.encounterActions = [
                    { name: "AdverseEvent" },
                    { name: "Injury" }
                ];

				$scope.incompleteSubjectEncounters = function (item) {
					return item.percentComplete < 0.999
						&& (item.viewable || item.creatable || item.editable);

				};
			}])
    ;
}());


