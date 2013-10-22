(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('yesNo', function () {
			return function (value, ignoreNull) {
				if (value == null && ignoreNull) {
					return "";
				}
				return value ? LS.common.yes : LS.common.no;
			};
		})
	;
}());


