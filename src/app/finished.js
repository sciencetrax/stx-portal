(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('FinishedController',
			['$scope',
				function ($scope) {
					$scope.LSPage = LS.pages.finished;
				}
			]
		)
	;
}());
