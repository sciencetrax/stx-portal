angular.module('stx.core.directives.metaValidate', [
		'ui.validate'
	])
	.directive('metaValidate',['$compile',  function($compile) {
		return {
			require: 'ngModel',
			link: function (scope, element, attrs, controller) {
				var md = null;
				var remainingChars = null;
				scope.$watch(attrs.metaValidate, function (value) {
					if (value === undefined) {
						return;
					}
					md = value;
					if (!String.isNullEmptyOrUndefined(md.name)) {
						element.attr("name", md.name);
						element.attr("placeholder", scope.LSPage.get(md.name.camelCase()));
					}
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
					if (md.isRequired) {
						element.attr("required", true);
					}
					if (md.minValue !== null) {
						element.attr("min", md.length);
					}
					if (md.maxValue !== null) {
						element.attr("max", md.length);
					}
					if (md.length !== null) {
						element.addClass('remaining-chars');
						remainingChars = $compile("<span class='remaining-chars-value'></span>")(scope);
						element.parent() .append(remainingChars);
					}
				});

				controller.$parsers.push(function(text) {
					if (md.isRequired) {
						controller.$setValidity('required', !String.isNullEmptyOrUndefined(text));
					}
					if (md.length !== null) {
						element.addClass('remaining-chars');
						controller.$setValidity('maxlength', text.length <= md.length);
						if (md.length - text.length < 0) {
							remainingChars.addClass('negative');
							remainingChars.html("(" + (text.length - md.length) + " too many)");
						} else {
							remainingChars.removeClass('negative');
							remainingChars.html("(" + (md.length - text.length) + " chars rem.)");
						}
					}
				});
			}
		};
	}])
;
