angular.module('common.directives.backButton', [])
    .directive('backButton', ['$window', function($window){
    return {
        restrict: 'A',

        link: function(scope, element, attrs) {
            element.bind('click', function() {
                $window.history.back();
            });
        }
    };
}]);