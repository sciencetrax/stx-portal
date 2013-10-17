angular.module('stx.core.directives')
	.directive('stSubmit', ['$parse', function ($parse) {
		return {
			restrict: 'A',
			require: 'form',
			link: function (scope, element, attr, controller) {
				var fn = $parse(attr.stSubmit);
				controller.checkError = function(control, errorType) {
					var error = control.$error[errorType];
					return (controller.submitAttempted && error) || (control.$dirty && error);
				};
				element.bind('submit', function (event) {
					element.addClass('submit-attempted');
					controller.submitAttempted = true;
	//				scope.$broadcast('$validate');
					scope.$apply(function () {
						if (controller.$invalid) {
							return false;
						}

						fn(scope, {$event: event});
					});
				});
			}
		};
	}])
;

