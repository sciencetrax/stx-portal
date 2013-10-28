(function () {
	"use strict";
	angular.module('stx.reports')
		.controller("ReportsViewController", ['$scope', '$stateParams', 'session', 'authorizationContextResolver', 'Account', 'ProjectReport', 'EncounterReport', 'WebServiceConfig',
			function ($scope, $stateParams, session, authorizationContextResolver, Account, ProjectReport, EncounterReport, WebServiceConfig) {
				var authorizationContext = authorizationContextResolver.data;
				var subject = authorizationContext.subject;
				var securityProfile = {
					customerId: authorizationContext.customerId,
					projectId: subject.projects[0].projectId,
					subjectId: subject.id,
					siteId: subject.projects[0].siteId,
					encounterId: $stateParams.encounterId,
					reportId: $stateParams.reportId
				};

				$scope.LSPage = LS.pages.reports.view;
				var url = 'customers/{0}/projects/{1}/sites/{2}/subjects/{3}/encounters/{4}/reports/{5}?pdfContentsOnly=true';
				if (String.isNullEmptyOrUndefined($stateParams.encounterId)) {
					url = 'customers/{0}/projects/{1}/sites/{2}/subjects/{3}/reports/{5}?pdfContentsOnly=true';//&encounterId=';
					$scope.report = ProjectReport.get(securityProfile);
				} else {
					$scope.report = EncounterReport.get(securityProfile);
				}

				var pdfUrl = UrlUtils.combine(WebServiceConfig.getBaseUrl(), url)
					.format(
						securityProfile.customerId,
						securityProfile.projectId,
						securityProfile.siteId,
						securityProfile.subjectId,
						securityProfile.encounterId,
						securityProfile.reportId
					);
				$scope.pdfUrl = session.authorizeUrl(pdfUrl);
			}])
	;
}());


