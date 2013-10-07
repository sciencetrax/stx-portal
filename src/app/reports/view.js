(function () {
	"use strict";
	angular.module('stx.reports')
		.controller("ReportsViewController", ['$scope', '$stateParams', 'Account', 'EncounterReport', 'SecurityService', 'WebServiceConfig',
			function ($scope, $stateParams, Account, EncounterReport, SecurityService, WebServiceConfig) {
				var authorizationContext = SecurityService.authorizationContext;
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
				$scope.report = EncounterReport.get(securityProfile);

				var pdfUrl = UrlUtils.combine(WebServiceConfig.getBaseUrl(),
						'customers/{0}/projects/{1}/sites/{2}/subjects/{3}/encounters/{4}/reports/{5}?pdfContentsOnly=true')
					.format(
						securityProfile.customerId,
						securityProfile.projectId,
						securityProfile.siteId,
						securityProfile.subjectId,
						securityProfile.encounterId,
						securityProfile.reportId
					);
				$scope.pdfUrl = SecurityService.authorizeUrl(pdfUrl);
			}])
	;
}());


