(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('stringDate', function () {
			return function (value) {
				return moment(new Date(value)).fromNow();
			};
		})
	;
}());


