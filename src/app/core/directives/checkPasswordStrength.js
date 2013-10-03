angular.module('stx.core.directives')
	.directive('stCheckPasswordStrength', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, controller) {
				var checkPasswordStrength = function (password) {
					// http://stackoverflow.com/questions/948172/password-strength-meter
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
;
