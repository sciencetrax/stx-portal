angular.module('stx.core.directives')
    .directive('stAppend',[function () {
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
