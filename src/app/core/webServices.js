var serviceActions = { update: { method: "PUT" } };

angular.module('stx.core.webService', [
        'ngResource'
    ])
    .provider('WebServiceConfig', function () {
        this.applicationPath = '/';
        this.apiBase = 'api/';

        this.configure = function (applicationPath, apiBase) {
            this.applicationPath = applicationPath;
            this.apiBase = apiBase;
        };

        this.getApplicationPath = function () {
            return this.applicationPath;
        };
        this.getApiBase = function () {
            return this.apiBase;
        };

        var _this = this;
        var instance = {
            getApplicationPath: function() {
                return _this.getApplicationPath();
            },
            getBaseUrl: function () {
                return UrlUtils.combine(_this.getApplicationPath(), _this.getApiBase());
            }
        };
        this.$get = function () {
            return instance;
        };
    })

    .factory('Authorization', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
        return $resource(UrlUtils.combine(WebServicesConfig.getBaseUrl(), 'authorization?portalCode=:portalCode&username=:username&password=:password'), {
            portalCode: '@portalCode',
            username: '@username',
            password: '@password'
        });
    }])
    .factory('authorizationContext', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
        return $resource(UrlUtils.combine(WebServicesConfig.getBaseUrl(), 'authorizationcontext'));
    }])
    .factory('DataEntryForm', ['$http', 'WebServiceConfig', 'VariablePanelScript', function ($http, WebServicesConfig, VariablePanelScript) {
        return {
            get: function (projectId, portalId, intervalId, encounterId, variableGroupId) {
                var _this = this;
                return $http({
                        method: 'GET',
                        url: _this.getUrl(),
                        params: {
                            portalId: portalId,
                            intervalId: intervalId,
                            encounterId: encounterId,
                            projectId: projectId,
                            variableGroupId: variableGroupId
                        }
                    }
                );
            },
            loadScript: function(customerId, projectId, siteId, subjectId, intervalId, encounterId, includeProjectVariableGroups, successCallback) {
                VariablePanelScript.get({
                    customerId: customerId,
                    projectId: projectId,
                    siteId: siteId,
                    subjectId: subjectId,
                    intervalId: intervalId,
                    encounterId: encounterId,
                    includeProjectVariableGroups: includeProjectVariableGroups
                }, function (data) {
                    $('#VariableToolsMenu').remove();
                    stx.VariablePanel.Utils.notCollectedVariablesId = null;
                    stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;
                    var dataEntryPanel = $('.DataEntryPanel');

                    dataEntryPanel.append("<input type='hidden' id='NotCollectedVariableGroupIds' />");
                    dataEntryPanel.append("<input type='hidden' id='NotCollectedVariableIds' />");
                    for (var index = 0; index < data.dependentVariables.length; index++) {
                        var variable = data.dependentVariables[index];
                        dataEntryPanel.append("<input type='hidden' id='vcid" + variable.variableId + "' isHiddenVariable='true' VariableGroupId='" + variable.variableGroupId + "' variableId='" + variable.variableId + "' value='" + variable.value + "' />");
                    }

                    var scriptDiv = $('#variable-panel-code');
                    var script = $('<script/>');
                    script.append(data.project);
                    script.append(data.interval);
                    script.append(data.encounter);
                    script.append(data.initialize);
                    script.append("$(document).trigger('pageLoad');");
                    scriptDiv.html(script);

                    $('.DataEntryPanel li.hide').removeClass('hide');

                    if (successCallback !== undefined) {
                        successCallback();
                    }
                });
            },
            getUrl: function() {
                return UrlUtils.combine(WebServicesConfig.getApplicationPath(), 'Areas/app/WebForms/SubjectHome/DataEntry.aspx');
            }
        };
    }])
    .factory('SubjectVariableGroupSummary', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
        return $resource(UrlUtils.combine(WebServicesConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/variablegroupsummaries'));
    }])
    .factory('ScheduledEncounter', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
        return $resource(UrlUtils.combine(WebServicesConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/scheduledencounters'));
    }])
    .factory('VariablePanelScript', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
        return $resource(UrlUtils.combine(WebServicesConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/variablePanelScript'));
    }])


    .factory('Account', ['$resource', '$http', function ($resource, $http) {
        return $resource(applicationPath + 'api/customers/:customerId/users/:id', {
            customerId: '@customerId',
            id: '@id'
        }, serviceActions);
    }])
    .factory('Metadata', ['$resource', function ($resource) {
        return $resource(applicationPath + 'api/metadata/:entityType');
    }])
    .factory('Session', ['$resource', function ($resource) {
        return $resource(applicationPath + 'api/sessions/:id', {
            id: '@id'
        });
    }])
;
