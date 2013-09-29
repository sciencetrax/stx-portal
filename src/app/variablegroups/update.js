(function () {
    "use strict";

    angular.module('stx.variablegroups.update', [
            'stx.core.navigationService',
            'stx.core.directives.backButton',
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('variablegroups', {
                    abstract: true,
                    url: "/variablegroups",
                    template: "<div ui-view></div>"
                })
                .state('variablegroupsUpdate', {
                    url: '/variablegroups/update/{variableGroupId}/{intervalId}/{encounterId}',
                    controller: 'variablegroups.update.controller',
                    templateUrl: 'variablegroups/update.tpl.html',
                    data: { pageTitle: 'Variable Group | Update' }
                })
            ;
        }])
        .controller("variablegroups.update.controller", ['$scope', '$http', '$window', '$stateParams', '$location', 'SecurityService', 'NavigationService', 'DataEntryForm',
            function ($scope, $http, $window, $stateParams, $location, SecurityService, NavigationService, DataEntryForm) {
                var authorizationContext = SecurityService.authorizationContext;
                var dataEntryPanel = $('.DataEntryPanel');

                DataEntryForm.loadScript(
                    SecurityService.authorizationContext.customerId,
                    SecurityService.authorizationContext.subject.projects[0].projectId,
                    SecurityService.authorizationContext.subject.projects[0].siteId,
                    SecurityService.authorizationContext.subject.id,
                    $stateParams.intervalId,
                    $stateParams.encounterId,
                    false, function () {
                        DataEntryForm.get(
                                authorizationContext.projectId,
                                authorizationContext.portalId,
                                $stateParams.intervalId,
                                $stateParams.encounterId,
                                $stateParams.variableGroupId
                            )
                            .success(function (data) {
                                stx.VariablePanel.Utils.notCollectedVariablesId = null;
                                stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;
                                dataEntryPanel.append(data);
                                $(document).trigger('pageLoad');
                            });
                    });

                $scope.save = function () {
                    var form = $('.DataEntryPanel form');
                    var action = form.attr('action');
                    var queryString = action.substring(action.indexOf("?") + 1);
                    form.attr('action', DataEntryForm.getUrl() + "?" + queryString);
                    form.ajaxSubmit({
                        headers: { "X-Authorization": SecurityService.authorization },
                        success: function (data) {
                            stx.VariablePanel.Utils.notCollectedVariablesId = null;
                            stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;

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


