angular.module('stx.core.directives.metaValidate', [
		'ui.validate'
	])
	.directive('checkStrength', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, controller) {
				var checkPasswordStrength = function (password) {
					var score = 0;

					// award every unique letter until 5 repetitions
					var letters = {};
					for (var index = 0; index < password.length; index++) {
						letters[password[index]] = (letters[password[index]] || 0) + 1;
						score += 5.0 / letters[password[index]];
					}

					// bonus points for mixing it up
					var variations = {
						digits: /\d/.test(password),
						lower: /[a-z]/.test(password),
						upper: /[A-Z]/.test(password),
						nonWords: /\W/.test(password)
					};

					var variationCount = 0;
					for (var check in variations) {
						variationCount += (variations[check] === true) ? 1 : 0;
					}
					score += (variationCount - 1) * 10;

					if (score > 80) {
						return "strong";
					}
					if (score > 60) {
						return "ok";
					}
					if (score >= 30) {
						return "weak";
					}
					return "weak";
				};

				var strength = $compile("<span class='password-strength'>&nbsp;</span>")(scope);
				strength.insertBefore(element);

				element.on('keyup', function () {
					scope.$apply(function () {
						strength.removeClass("password-strength-weak");
						strength.removeClass("password-strength-ok");
						strength.removeClass("password-strength-strong");
						var password = element.val();
						if (password === '') {
							strength.css({ "display": "none"  });
						} else {
							strength.css({ "display": "inline" });
						}
						strength.addClass("password-strength-" + checkPasswordStrength(password));
					});
				});
			}
		};
	}])


	.directive('metaValidate', ['$compile', function ($compile) {
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
						var name = md.name.camelCase();
						if (element.attr("name") == null) {
							element.attr("name", name);
						}
						element.attr("placeholder", scope.LSPage.get(name));
					}
					if (md.type === "int"
						|| md.type === "float"
						|| md.type === "decimal"
						|| md.type === "double") {
						element.attr("type", "number");
					} else if (md.type === "datetime") {
						element.attr("type", "datetime");
					} else if (md.type === "text" &&
						element.attr("type") == null) {
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
							remainingChars.html("({0} / {1}}".format(text.length, md.length));
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
