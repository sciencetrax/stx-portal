(function () {
	"use strict";
	angular.module('stx.core.filters')
		.filter('timeInterval', function () {
			return function (value) {
				var format = "hh:mm:ss";
				var remainingSeconds = value;
				var minutes = parseInt(remainingSeconds / 60, 10);
				var hours = parseInt(minutes / 60, 10);
				minutes = minutes % 60;
				var seconds = parseInt(remainingSeconds % 60, 10);
				if (seconds < 10) {
					seconds = "0" + seconds;
				}

				var remainingTime = format.replace('hh', hours);
				remainingTime = remainingTime.replace('mm', minutes);
				remainingTime = remainingTime.replace('ss', seconds);
				if (remainingTime.startsWith("0:")) {
					remainingTime = remainingTime.substring(2);
				}
				return remainingTime;
			};
		})
	;
}());


