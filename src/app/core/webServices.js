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
			getApplicationPath: function () {
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

	.factory('Account', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/accounts/:userId'), {
			customerId: '@customerId',
			id: '@id'
		}, serviceActions);
	}])
	.factory('Authorization', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'authorization?portalCode=:portalCode&username=:username&password=:password'), {
			portalCode: '@portalCode',
			username: '@username',
			password: '@password'
		}, serviceActions);
	}])
	.factory('AuthorizationUpdate', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'authorization?remainingSeconds=:remainingSeconds'), {
			remainingSeconds: "@remainingSeconds"
		}, serviceActions);
	}])
	.factory('AuthorizationContext', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'authorizationcontext'));
	}])
	.factory('DataEntryForm', ['$http', 'WebServiceConfig', 'EnrollmentVariablePanelScript', 'VariablePanelScript',
		function ($http, WebServiceConfig, EnrollmentVariablePanelScript, VariablePanelScript) {
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
				enrollScript: function (customerId, projectId, siteId, intervalId) {
					var _this = this;
					VariablePanelScript.get({
						customerId: customerId,
						projectId: projectId,
						siteId: siteId,
						intervalId: intervalId,
						encounterId: encounterId,
						includeProjectVariableGroups: includeProjectVariableGroups
					}, function (data) {
						_this.loadScript2(data);
					});
				},
				loadEnrollmentScript: function (customerId, projectId, siteId, intervalId, successCallback) {
					var _this = this;
					EnrollmentVariablePanelScript.get({
						customerId: customerId,
						projectId: projectId,
						siteId: siteId,
						intervalId: intervalId,
						includeProjectVariableGroups: false
					}, function (data) {
						_this.loadScript2(data, successCallback);
					});
				},
				loadScript: function (customerId, projectId, siteId, subjectId, intervalId, encounterId, includeProjectVariableGroups, successCallback) {
					var _this = this;
					VariablePanelScript.get({
						customerId: customerId,
						projectId: projectId,
						siteId: siteId,
						subjectId: subjectId,
						intervalId: intervalId,
						encounterId: encounterId,
						includeProjectVariableGroups: includeProjectVariableGroups
					}, function (data) {
						_this.loadScript2(data, successCallback);
					});
				},
				loadScript2: function (scriptToLoad, successCallback) {
					$('#VariableToolsMenu').remove();
					stx.VariablePanel.Utils.notCollectedVariablesId = null;
					stx.VariablePanel.Utils.notCollectedVariablesGroupId = null;
					var dataEntryPanel = $('.DataEntryPanel');

					dataEntryPanel.append("<input type='hidden' id='NotCollectedVariableGroupIds' />");
					dataEntryPanel.append("<input type='hidden' id='NotCollectedVariableIds' />");
					for (var index = 0; index < scriptToLoad.dependentVariables.length; index++) {
						var variable = scriptToLoad.dependentVariables[index];
						dataEntryPanel.append("<input type='hidden' id='vcid" + variable.variableId + "' isHiddenVariable='true' VariableGroupId='" + variable.variableGroupId + "' variableId='" + variable.variableId + "' value='" + variable.value + "' />");
					}

					var scriptDiv = $('#variable-panel-code');
					var script = $('<script/>');
					script.append(scriptToLoad.project);
					script.append(scriptToLoad.interval);
					script.append(scriptToLoad.encounter);
					script.append(scriptToLoad.initialize);
					script.append("$(document).trigger('pageLoad');");
					scriptDiv.html(script);

					$('.DataEntryPanel li.hide').removeClass('hide');

					if (successCallback !== undefined) {
						successCallback();
					}
				},
				getUrl: function () {
					return UrlUtils.combine(WebServiceConfig.getApplicationPath(), 'Areas/app/WebForms/SubjectHome/DataEntry.aspx');
				}
			};
		}])
	.factory('DataEntryStatus', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'dataentrystatus'));
	}])
	.factory('EmailRequest', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'portals/:portalId/emailrequests?emailType=:emailType&username=:username&password=:password&emailAddress=:emailAddress'), {
			portalId: "@portalId",
			emailType: "@emailType",
			emailAddress: '@emailAddress',
			username: '@username',
			password: '@password'
		});
	}])
	.factory('EncounterReport', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/encounters/:encounterId/reports/:reportId'), {
			customerId: "@customerId",
			projectId: "@projectId",
			siteId: '@siteId',
			subjectId: '@subjectId',
			encounterId: '@encounterId',
			reportId: '@reportId'
		});
	}])
	.factory('EnrollmentVariablePanelScript', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/intervals/:intervalId/variablePanelScript'));
	}])
	.factory('Metadata', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'metadata/:entityType'));
	}])
	.factory('PasswordReset', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'portals/:portalId/passwordReset/:token?password=:password'), {
			portalId: "@portalId",
			token: "@token",
			password: "@password"
		}, serviceActions);
	}])
	.factory('Portal', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'portals/:code'));
	}])
	.factory('SubjectVariableGroupSummary', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/variablegroupsummaries'));
	}])
	.factory('ScheduledEncounter', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/scheduledencounters'));
	}])
	.factory('Session', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'session/:id'), {
			id: "@id"
		});
	}])
	.factory('VariablePanelScript', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/variablePanelScript'));
	}])
;
