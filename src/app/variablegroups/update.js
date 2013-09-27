(function () {
    "use strict";

    angular.module('stx.variablegroups.update', [
            'ui.state'
        ])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('variableGroupUpdate', {
                url: '/variablegroups/update',
                controller: 'VariableGroupUpdateController',
                templateUrl: 'variablegroups/update.tpl.html',
                data: { pageTitle: 'Variable Group | Update' }
            })
            ;
        }])
        .controller("VariableGroupUpdateController", function() {
        })
    ;
}());


