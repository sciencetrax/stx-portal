(function () {
	"use strict";

	angular.module('stx.encounters')
		.controller("EncountersViewDetailsController", ['$scope', '$stateParams', 'authorizationContextResolver', 'DataEntryForm',
			function ($scope, $stateParams, authorizationContextResolver, DataEntryForm) {
				$('#VariableToolsMenu').remove();

				var authorizationContext = authorizationContextResolver.data;
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


