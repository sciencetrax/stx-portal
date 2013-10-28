(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('incomplete', function () {
			return function (array) {
				var complete = function (item) {
					return !(item.percentComplete == null || item.percentComplete < 0.9999);
				};
				if (array.length === undefined) {
					return !complete(array);
				}

				var result = [];
				for (var index = 0; index < array.length; index++) {
					var item = array[index];
					if (!complete(item)) {
						result.push(item);
					}
				}
				return result;
			};
		})
	;
}());
