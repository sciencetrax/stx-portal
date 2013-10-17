angular.module('stx.core.directives')
	.directive('stAutofocus', [function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element[0].focus();
			}
		};
	}])
;

