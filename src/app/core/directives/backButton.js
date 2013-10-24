angular.module('stx.core.directives')
	.directive('stBackButton', ['$window', function ($window) {
		return {
			restrict: 'A',

			link: function (scope, element, attrs) {
				element.bind('click', function () {
					scope.back();
				});
			}
		};
	}])
;