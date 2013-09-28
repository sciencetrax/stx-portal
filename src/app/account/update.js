(function () {
    "use strict";

    angular.module('stx.account', [
            'ui.router'
        ])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('accountUpdate2', {
                url: '/account/update',
                controller: 'AccountUpdateController',
                templateUrl: 'account/view.tpl.html',
                data: { pageTitle: 'Account Update' }
            })
            ;
        }])
        .controller('AccountUpdateController', function() {

        })
    ;
}());


