(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('top', function () {
			return function (array, numberOfItems) {
				if (array === undefined || array.length <= numberOfItems) {
					return array;
				}

				var result = [];
				for (var index = 0; index < numberOfItems; index++) {
					result.push(array[index]);
				}
				return result;
			};
		})
	;
}());
