(function () {
	"use strict";

	angular.module('stx.encounters.details', [
			'ui.router',
			'stx.encounters.view'
		])
		.controller("EncounterViewDetailsController", ['$scope', '$stateParams', 'SecurityService', 'DataEntryForm', 'ScheduledEncounter',
			function ($scope, $stateParams, SecurityService, DataEntryForm, ScheduledEncounter) {
				$('#VariableToolsMenu').remove();

				var authorizationContext = SecurityService.authorizationContext;
				var subject = authorizationContext.subject;

				DataEntryForm.loadScript(
					authorizationContext.customerId,
					subject.projects[0].projectId,
					subject.projects[0].siteId,
					subject.id,
					$stateParams.intervalId,
					$stateParams.encounterId,
					false);

				$scope.encounterFilter = 'all';
			}])
	;
}());


