(function () {
	"use strict";
	angular.module('stx.core')
		.service('portalResolver',
			['$rootScope', '$q', 'Portal', function ($rootScope, $q, Portal) {
				return {
					data: null,
					resolved: false,

					resolve: function () {
						var _this = this;

						var deferred = $q.defer();
						if (_this.data == null) {
							_this.data = Portal.get({ code: PORTAL_CODE, includeProject: true }, function (data) {
								$rootScope.portal = data;
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
