// Restangular - An alternative to using $resource
// https://github.com/mgonto/restangular#setonelemrestangularized

var applicationPath = "/StudyTrax/";
var serviceActions = { update: { method: "PUT" } };

angular.module('stxServices', ['ngResource'])
	.factory('Account', ['$resource', '$http', function($resource, $http) {
		return $resource(applicationPath + 'api/customers/:customerId/users/:id', {
			customerId: '@customerId',
			id: '@id'
		}, serviceActions);
	}])
	.factory('Authorization', ['$resource', function($resource) {
		return $resource(applicationPath + 'api/authorization?portalCode=:portalCode&username=:username&password=:password', {
			portalCode: '@portalCode',
			username: '@username',
			password: '@password'
		});
	}])
	.factory('AuthorizationContext', ['$resource', function($resource) {
		return $resource(applicationPath + 'api/authorizationcontext');
	}])
	.factory('Metadata', ['$resource', function($resource) {
		return $resource(applicationPath + 'api/metadata/:entityType');
	}])
	.factory('Session', ['$resource', function($resource) {
		return $resource(applicationPath + 'api/sessions/:id', {
			id: '@id'
		});
	}])
	.factory('SubjectVariableGroupSummary', ['$resource', function($resource) {
		return $resource(applicationPath + 'api/customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/variablegroupsummaries');
	}])
	.factory('ScheduledEncounter', ['$resource', function($resource) {
		return $resource(applicationPath + 'api/customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/scheduledencounters');
	}])
;
