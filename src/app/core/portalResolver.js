(function () {
	"use strict";
	angular.module('stx.core')
		.service('portalResolver',
			['$q', 'Portal', function ($q, Portal) {
				return {
					data: null,
					resolved: false,

					resolve: function () {
						var _this = this;

						var deferred = $q.defer();
						if (_this.data == null) {
							_this.data = Portal.get({ code: PORTAL_CODE, includeProject: true }, function () {
								_this.resolved = true;
								deferred.resolve();
							});
						}
						return deferred.promise;
					}
				};
			}]
		)
	;
}());
