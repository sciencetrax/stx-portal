var NavigationService;
(function () {
    "use strict";
    NavigationService = Class.extend({
        $window: null,
        $location: null,

        init: function () {
        },

        back: function() {
            this.$window.history.back();
        }
    });

    angular.module('stx.core.navigationService', [
            'ngCookies'
        ])
        .provider('NavigationService', Class.extend({
            instance: new NavigationService(),

            $get: ['$window', '$location', function ($window, $location) {
                this.instance.$window = $window;
                this.instance.$location = $location;
                return this.instance;
            }]
        }))
    ;
}());
