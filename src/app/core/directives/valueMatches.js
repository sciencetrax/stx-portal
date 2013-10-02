angular.module('stx.core.directives.valueMatches', [
		'ui.validate'
	])
	.directive('valueMatches', [function () {
		return {
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				var firstPassword = '#' + attrs.valueMatches;


				elem.add(firstPassword).on('keyup', function () {
					scope.$apply(function () {
						var v = elem.val() === $(firstPassword).val();
						ctrl.$setValidity('valueMatches', v);
					});
				});
			}
		};
	}])
;
