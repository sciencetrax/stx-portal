(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('readOnlyEncounter', [function () {
			return function (array, isReadOnly) {
				isReadOnly = isReadOnly == null ? true: isReadOnly;
				var filterFunction = function (item) {
					var readOnly = !item.creatable && !item.editable;
					return isReadOnly == readOnly;
				};
				if (array.length === undefined) {
					return filterFunction(array);
				}

				var result = [];
				for (var index = 0; index < array.length; index++) {
					var item = array[index];
					if (filterFunction(item)) {
						result.push(item);
					}
				}
				return result;
			};
		}])
	;
}());
