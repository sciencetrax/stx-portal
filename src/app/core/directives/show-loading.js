angular.module('stx.core.directives')
	.directive('stShowLoading', [function () {
		return {
			restrict: 'A',
			transclude: true,
			template: "<div ng-show='!$root.ready'></div>",
			link: function (scope, element, attrs) {
//				scope.ready = true;
				/*
				scope.$watch(attrs.stSohwLoading, function (value) {
					if (value) {
						element.show();
					}
				});
				/**/
			}
		};
	}])
;
