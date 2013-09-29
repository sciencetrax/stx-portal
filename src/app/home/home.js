(function () {
    "use strict";
    angular.module('stx.home', [
            'stx.core',
            'stx.home.incompleteVariableGroupSummaries',
            'ui.router'
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('home', {
                url: '/home',
                controller: 'HomeController',
                templateUrl: 'home/home.tpl.html',
                data: { pageTitle: 'Home' }
            })
            .state('home.summary', { url: '/summary', templateUrl: 'home/home-summary.tpl.html', controller: 'HomeController' })
            .state('home.details', { url: '/details', templateUrl: 'home/home-details.tpl.html', controller: 'HomeController' })
            .state('home.profile', { url: '/profile', templateUrl: 'home/home-profile.tpl.html', controller: 'HomeController' })
            ;
        }])
        .controller("home.details.controller", ['$scope', '$state', '$filter', 'SecurityService', 'SubjectVariableGroupSummary', 'ScheduledEncounter',
            function ($scope, $state, $filter, SecurityService, SubjectVariableGroupSummary, ScheduledEncounter) {

        }])
        .controller("HomeController", ['$scope', '$state', '$filter', 'SecurityService', 'SubjectVariableGroupSummary', 'ScheduledEncounter', function ($scope, $state, $filter, SecurityService, SubjectVariableGroupSummary, ScheduledEncounter) {
            $scope.LSPage = LS.pages.home;
            $scope.$state = $state;
            var securityProfile = {
                customerId: SecurityService.authorizationContext.customerId,
                projectId: SecurityService.authorizationContext.subject.projects[0].projectId,
                subjectId: SecurityService.authorizationContext.subject.id,
                siteId: SecurityService.authorizationContext.subject.projects[0].siteId
            };

            $scope.projectVariableGroups = SubjectVariableGroupSummary.query(securityProfile, function (data) {
                $scope.incompleteSummaries = $filter('incompleteVariableGroupSummaries')(data);
            });
            $scope.encounters = ScheduledEncounter.query(securityProfile);
        }])
    ;
}());


