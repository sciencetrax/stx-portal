(function () {
	"use strict";
	angular.module('stx.core')
		.service('authorizationContextResolver',
			['$q', 'AuthorizationContext', function ($q, AuthorizationContext) {
				return {
					data: null,
					resolved: false,

					reset: function() {
						this.data = null;
						this.resolved = false;
					},

					resolve: function (onResolved) {
						var _this = this;

						var deferred = $q.defer();
						if (_this.data == null) {
							_this.data = AuthorizationContext.get({}, function () {
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
