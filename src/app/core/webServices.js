var serviceActions = { update: { method: "PUT" } };

angular.module('stx.core.webService', [
		'ngResource'
	])
	.provider('WebServiceConfig', function () {
		this.applicationPath = '/';
		this.apiBase = 'api/';

		this.configure = function (applicationPath, apiBase) {
			if (!applicationPath.startsWith("http")) {
				applicationPath = applicationPath.replace("//", "/");
			}
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
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/portals/:portalId/accounts/:id'), {
			customerId: '@customerId',
			projectId: '@projectId',
			portalId: '@portalId',
			id: '@id'
		}, serviceActions);
	}])
	.factory('Authorization', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'authorization?portalCode=:portalCode&username=:username&password=:password&referenceId=:referenceId'), {
			portalCode: '@portalCode',
			username: '@username',
			password: '@password',
			referenceId: '@referenceId'
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
				loadScript: function (customerId, projectId, subjectId, intervalId, encounterId, includeProjectVariableGroups, successCallback) {
					var _this = this;

					VariablePanelScript.get({
						customerId: customerId,
						projectId: projectId,
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
					var dataEntryPanel = $('.DataEntryPanel,.data-entry-panel');

					dataEntryPanel.append("<input type='hidden' id='NotCollectedVariableGroupIds' />");
					dataEntryPanel.append("<input type='hidden' id='NotCollectedVariableIds' />");
					for (var index = 0; index < scriptToLoad.dependentVariables.length; index++) {
						var variable = scriptToLoad.dependentVariables[index];
						dataEntryPanel.append("<input type='hidden' class='VariablePanel' id='vcid" + variable.variableId + "' isHiddenVariable='true' VariableGroupId='" + variable.variableGroupId + "' variableId='" + variable.variableId + "' value='" + variable.value + "' />");
					}

					var scriptDiv = $('#variable-panel-code');
					var script = $('<div/>');
					script.append("<script>" + scriptToLoad.project + "</scr" + "ipt>");
					script.append("<script>" + scriptToLoad.interval + "</scr" + "ipt>");
					script.append("<script>" + scriptToLoad.encounter + "</scr" + "ipt>");
					script.append("<script>" + scriptToLoad.initialize + "</scr" + "ipt>");
					scriptDiv.html(script);
					$(document).trigger('pageLoad');

					$('.DataEntryPanel li.hide,.data-entry-panel li.hide').removeClass('hide');

					if (successCallback !== undefined) {
						successCallback();
					}
				},
				getUrl: function () {
					// We add the timestamp to this request because IE caches this request for some reason.
					return UrlUtils.combine(WebServiceConfig.getApplicationPath(), 'Areas/app/WebForms/SubjectHome/DataEntry.aspx?_ts=' + new Date().getTime());
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
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/subjects/:subjectId/encounters/:encounterId/reports/:reportId'), {
			customerId: "@customerId",
			projectId: "@projectId",
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
	.factory('Password', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/users/:userId/password/:newPassword?oldPassword=:oldPassword'), {
			customerId: "@customerId",
			userId: "@userId",
			newPassword: "@newPassword",
			oldPassword: "@oldPassword"
		});
	}])
	.factory('PasswordReset', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/portals/:portalId/passwordReset/:token?password=:password'), {
			customerId: "@customerId",
			projectId: "@projectId",
			portalId: "@portalId",
			token: "@token",
			password: "@password"
		}, serviceActions);
	}])
	.factory('Portal', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'portals/:code'));
	}])
	.factory('ProjectReport', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/subjects/:subjectId/reports/:reportId'), {
			customerId: "@customerId",
			projectId: "@projectId",
			subjectId: "@subjectId"
		});
	}])
	.factory('Subject', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), '/customers/:customerId/projects/:projectId/subjects/:subjectId'));
	}])
	.factory('SubjectVariableGroupSummary', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/subjects/:subjectId/variablegroupsummaries'));
	}])
	.factory('ScheduledEncounter', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/subjects/:subjectId/intervals/:intervalId/scheduledencounters/:id'), {
			customerId: '@customerId',
			projectId: '@projectId',
			subjectId: '@subjectId',
			intervalId: '@intervalId',
			id: '@id'
		});
	}])
	.factory('ScheduledEncounterList', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/subjects/:subjectId/scheduledencounters'), {
			customerId: '@customerId',
			projectId: '@projectId',
			intervalId: '@intervalId'
		});
	}])
	.factory('Session', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'session/:id'), {
			id: "@id"
		});
	}])
	.factory('VariablePanelScript', ['$resource', 'WebServiceConfig', function ($resource, WebServiceConfig) {
		return $resource(UrlUtils.combine(WebServiceConfig.getBaseUrl(), 'customers/:customerId/projects/:projectId/subjects/:subjectId/variablePanelScript'));
	}])
;
