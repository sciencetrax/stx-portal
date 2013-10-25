(function () {
	"use strict";
	angular.module('stx.accounts')
		.controller('FinishedController',
			[function () {
					$('#anonymousSurveyCompleteMessage').clone().appendTo($('#contentDiv'));
				}
			]
		)
	;
}());
