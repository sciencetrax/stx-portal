angular.module('stx.core.directives')
	.directive('stValueMatches', [function () {
		return {
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				var firstElement = $('#' + attrs.stValueMatches);
				var isValid = function () {
					var value = elem.val();
					/*
					 * When there is no value, there is no error.  In order to enforce the
					 * validation when there is no value, the required attribute should be set.
					 */
					return String.isNullOrEmpty(value) || value === firstElement.val();
				};

				/*
				 * We want to only go from "No Error" to "Error" when the focus is lost, but
				 * if there is currently an error, we want to remove the error as soon as it
				 * matches.
				 */
				elem.on('blur', function () {
					scope.$apply(function () {
						ctrl.$setValidity('stValueMatches', isValid());
					});
				});
				firstElement.on('blur', function () {
					scope.$apply(function () {
						ctrl.$setValidity('stValueMatches', isValid());
					});
				});
				elem.on('keyup', function () {
					if (ctrl.$error.stValueMatches) {
						scope.$apply(function () {
							ctrl.$setValidity('stValueMatches', isValid());
						});
					}
				});
			}
		};
	}])
;
