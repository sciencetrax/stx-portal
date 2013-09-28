(function () {
    "use strict";

    angular.module('stx.variablegroups.update', [
            'stx.core.navigationService',
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('variableGroupUpdate', {
                url: '/variablegroups/update/{variableGroupId}/{intervalId}/{encounterId}',
                controller: 'VariableGroupUpdateController',
                templateUrl: 'variablegroups/update.tpl.html',
                data: { pageTitle: 'Variable Group | Update' }
            })
            ;
        }])
        .controller("VariableGroupUpdateController", ['$scope', '$http', '$window', '$stateParams', '$location', 'SecurityService', 'NavigationService', 'DataEntryForm',
            function ($scope, $http, $window, $stateParams, $location, SecurityService, NavigationService, DataEntryForm) {
                var authorizationContext = SecurityService.authorizationContext;
                var params = {
                    portalId: authorizationContext.portalId,
                    intervalId: $stateParams.intervalId,
                    encounterId: $stateParams.encounterId,
                    projectId: authorizationContext.projectId,
                    variableGroupId: $stateParams.variableGroupId
                };

                var dataEntryPanel = $('.DataEntryPanel');
                DataEntryForm.get(
                        authorizationContext.projectId,
                        authorizationContext.portalId,
                        $stateParams.intervalId,
                        $stateParams.encounterId,
                        $stateParams.variableGroupId
                    )
                    .success(function (data) {
                        dataEntryPanel.html(data);
                    });

                $scope.save = function () {
                    var form = $('.DataEntryPanel form');
                    var action = form.attr('action');
                    var queryString = action.substring(action.indexOf("?") + 1);
                    form.attr('action', DataEntryForm.getUrl() + "?" + queryString);
                    form.ajaxSubmit({
                        headers: { "X-Authorization": SecurityService.authorization },
                        success: function (data) {
                            dataEntryPanel.html(data);
                            if ($('.validation-summary-errors li', dataEntryPanel).length === 0) {
                                NavigationService.back();
                                $scope.$apply();
                            }
                        }
                    });
                };
            }])
    ;
}());


