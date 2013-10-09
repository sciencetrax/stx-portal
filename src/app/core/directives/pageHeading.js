﻿angular.module('stx.core.directives')
	.directive('stPageHeading', ['$window', function ($window) {
		return {
			replace: true,
			transclude: true,
			restrict: 'EA',
			scope: {
				text: "="
			},
			template: "<div class='page-heading' title='{{ text }}'>{{ text }}</div>",

			link: function (scope, element, attrs) {
				if (attrs.text === undefined) {
					if (scope.$parent.LSPage) {
						scope.name = scope.$parent.LSPage.heading;
					} else {
						scope.name = "$scope.LSPage not defined";
					}
				}
			}
		};
	}])
;