angular.module('autofocus', [])
    .directive('autofocus', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element[0].focus();
            }
        };
    });
