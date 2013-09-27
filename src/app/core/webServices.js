var serviceActions = { update: { method: "PUT" } };

angular.module('stx.core.webService', [
            'ngResource'
        ])
        .provider('WebServiceConfig', function () {
            this.baseUrl = '/api/';
            var _this = this;
            this.setBaseUrl = function (url) {
                this.baseUrl = url;
            };

            var instance = {
                getBaseUrl: function () {
                    return _this.baseUrl;
                }
            };
            this.$get = function () {
                return instance;
            };
        })

        .factory('Authorization', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
            return $resource(WebServicesConfig.getBaseUrl() + 'authorization?portalCode=:portalCode&username=:username&password=:password', {
                portalCode: '@portalCode',
                username: '@username',
                password: '@password'
            });
        }])
        .factory('authorizationContext', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
            return $resource(WebServicesConfig.getBaseUrl() + 'authorizationcontext');
        }])
        .factory('SubjectVariableGroupSummary', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
            return $resource(WebServicesConfig.getBaseUrl() + 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/variablegroupsummaries');
        }])
        .factory('ScheduledEncounter', ['$resource', 'WebServiceConfig', function ($resource, WebServicesConfig) {
            return $resource(WebServicesConfig.getBaseUrl() + 'customers/:customerId/projects/:projectId/sites/:siteId/subjects/:subjectId/scheduledencounters');
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
