angular.module('stx.core.directives')
	.directive('stValueMatches', [function () {
		return {
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				var firstPassword = '#' + attrs.stValueMatches;

				// Need to listen to both controls and only fire errors when both have values
				// might want to listen for blur instead of keyup
				elem.on('keyup', function () {
					scope.$apply(function () {
						var v = elem.val() === $(firstPassword).val();
						ctrl.$setValidity('stValueMatches', v);
					});
				});
			}
		};
	}])
;
