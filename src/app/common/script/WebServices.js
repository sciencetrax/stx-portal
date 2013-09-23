var applicationPath = "/StudyTrax/";
var serviceActions = { update: { method: "PUT" } };

var m = angular.module('stx.webServices', [
            'ngResource'
        ])
        .value('baseUrl', 'api/')
        .factory('Authorization', ['$resource', 'baseUrl', function ($resource, baseUrl) {
            return $resource(baseUrl + 'authorization?portalCode=:portalCode&username=:username&password=:password', {
                portalCode: '@portalCode',
                username: '@username',
                password: '@password'
            });
        }])
        .factory('AuthorizationContext', ['$resource', 'baseUrl', function ($resource, baseUrl) {
            return $resource(baseUrl + 'authorizationcontext');
        }])
        .factory('SubjectVariableGroupSummary', ['$resource', 'baseUrl', function ($resource, baseUrl) {
            return $resource(baseUrl + 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/variablegroupsummaries');
        }])
        .factory('ScheduledEncounter', ['$resource', 'baseUrl', function ($resource, baseUrl) {
            return $resource(baseUrl + 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/scheduledencounters');
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
