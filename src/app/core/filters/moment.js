(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('moment', function () {
			return function (value, mode, format) {
				if (value == null) {
					return "";
				}
				if (mode == 'calendar') {
					return moment(new Date(value)).calendar();
				} else if (mode == 'format') {
					return moment(new Date(value)).format(format);
				} else if (mode == 'fromNow') {
					return moment(new Date(value)).fromNow();
				}
				return moment(new Date(value)).fromNow();
			};
		})
	;
}());


