(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('encounterDueDescription',['$filter', function ($filter) {
			return function (value) {
				var date = new Date(value);
				if (new Date() - date < 24*60*60*1000) {
					return "now";
				}
				return $filter('timeAgo')(value);
			};
		}])
	;
}());


