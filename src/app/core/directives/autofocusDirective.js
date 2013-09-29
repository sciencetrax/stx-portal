angular.module('stx.core.directives.autofocus', [])
    .directive('autofocus',[function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element[0].focus();
            }
        };
    }]);
