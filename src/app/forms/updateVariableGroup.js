(function () {
    "use strict";

    angular.module('stx.forms.update.variablegroup', [
            'ui.state'
        ])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('formsUpdateVariableGroup', {
                url: '/forms/update/variablegroup',
                controller: 'UpdateVariableGroupController',
                templateUrl: 'forms/updateVariableGroup.tpl.html',
                data: { pageTitle: 'Variable Group | Update' }
            })
            ;
        }])
        .controller("UpdateVariableGroupController", function() {
        })
    ;
}());


