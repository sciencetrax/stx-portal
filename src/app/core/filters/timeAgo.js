(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('timeAgo', function () {
			return function (value) {
				return moment(new Date(value)).fromNow();
			};
		})
	;
}());


