angular.module('metaValidate', [])
    .directive('metaValidate', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.metaValidate, function (value) {
                    var md = scope.$eval(attrs.metaValidate);
                    if (md === undefined) {
                        return;
                    }
                    element.attr("name", md.name);
                    element.attr("placeholder", md.name);
                    if (md.type === "int"
                        || md.type === "float"
                        || md.type === "decimal"
                        || md.type === "double") {
                        element.attr("type", "number");
                    } else if (md.type === "datetime") {
                        element.attr("type", "datetime");
                    } else if (md.type === "text") {
                        element.attr("type", "text");
                    }

                    if (md.isRequired && element.attr("required") == null) {
                        element.attr("required", "true");
                        $compile(element[0].form)(scope);
                    }
                    if (md.length !== null) {
                        element.attr("ng-maxlength", md.length);
                    }
                    if (md.minValue !== null) {
                        element.attr("min", md.length);
                    }
                    if (md.maxValue !== null) {
                        element.attr("max", md.length);
                    }
                });
            }
        };
    }])
;
