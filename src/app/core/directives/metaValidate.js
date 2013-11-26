angular.module('stx.core.directives')
	.directive('stMetaValidate', ['$compile', function ($compile) {
		return {
			require: 'ngModel',
			link: function (scope, element, attrs, controller) {
				var md = null;
				var remainingChars = null;
				scope.$watch(attrs.stMetaValidate, function (value) {
					if (value === undefined) {
						return;
					}
					md = value;
					/*
					if (!String.isNullEmptyOrUndefined(md.name)) {
						var name = md.name.camelCase();
						if (element.attr("name") == null) {
							element.attr("name", name);
						}
						element.attr("placeholder", scope.LSPage.get(name));
					}
					*/
					if (md.type === "int"
						|| md.type === "float"
						|| md.type === "decimal"
						|| md.type === "double") {
						element.attr("type", "number");
					} else if (md.type === "datetime") {
						element.attr("type", "datetime");
					} else if (md.type === "text"
						&& element.attr("type") == null) {
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
						remainingChars.insertBefore(element);
					}
				});

				element.on('keyup', function () {
					scope.$apply(function () {
						var text = element.val();
						if (md.isRequired) {
							controller.$setValidity('required', !String.isNullEmptyOrUndefined(text));
						}
						if (md.length !== null) {
							var valid = text.length <= md.length;
							controller.$setValidity('maxlength', valid);
							remainingChars.html("({0} / {1})".format(text.length, md.length));
							if (md.length - text.length < 0) {
								remainingChars.addClass('negative');
							} else {
								remainingChars.removeClass('negative');
							}
							return valid;
						}
					});
				});
			}
		};
	}])
;
