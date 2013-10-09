angular.module('stx.core.directives')
	/*
	 * Appends the specified value to the element.  In addition to appending the value
	 * to the element, any html in the value will not be escaped.  This is useful
	 * for appending server generated html into an element.
	 */
	.directive('stAppend', [function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				scope.$watch(attrs.stAppend, function (value) {
					if (value == null) {
						return;
					}
					element.append(value);
				});
			}
		};
	}])
;
