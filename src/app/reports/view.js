(function () {
	"use strict";
	angular.module('stx.reports')
		.controller("ReportsViewController", ['$scope', '$stateParams', 'session', 'authorizationContextResolver', 'Account', 'ProjectReport', 'EncounterReport', 'WebServiceConfig',
			function ($scope, $stateParams, session, authorizationContextResolver, Account, ProjectReport, EncounterReport, WebServiceConfig) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;

				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: $scope.portal.projectId,
					subjectId: subject.id,
					encounterId: $stateParams.encounterId,
					reportId: $stateParams.reportId
				};

				$scope.LSPage = LS.pages.reports.view;
				var url = 'customers/{0}/projects/{1}/subjects/{2}/encounters/{3}/reports/{4}?pdfContentsOnly=true';
				if (String.isNullEmptyOrUndefined($stateParams.encounterId)) {
					url = 'customers/{0}/projects/{1}/subjects/{2}/reports/{4}?pdfContentsOnly=true';//&encounterId=';
					$scope.report = ProjectReport.get(securityProfile);
				} else {
					$scope.report = EncounterReport.get(securityProfile);
				}

				var pdfUrl = UrlUtils.combine(WebServiceConfig.getBaseUrl(), url)
					.format(
						securityProfile.customerId,
						securityProfile.projectId,
						securityProfile.subjectId,
						securityProfile.encounterId,
						securityProfile.reportId
					);
				$scope.pdfUrl = session.authorizeUrl(pdfUrl);
			}])
	;
}());


