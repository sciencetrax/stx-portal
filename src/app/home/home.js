angular.module('stx.home', [
    'ui.state'
])
    /**/
.config(function config($stateProvider) {
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
})
/**/
.controller("HomeController",['$scope', BaseController.extend({
    init: function ($scope, $routeParams, SubjectVariableGroupSummary, ScheduledEncounter) {
        /*
         var incompleteProjectVariableGroups = [];
         var authorizationContext = $scope.$root.authorizationContext;
         var summaries = SubjectVariableGroupSummary.query({
         customerId: authorizationContext.customerId,
         projectId: authorizationContext.projectId,
         siteId: authorizationContext.siteId,
         subjectId: authorizationContext.subjectId
         }, function () {
         for (var index = 0; index < summaries.length; index++) {
         var group = summaries[index];
         if (group.percentComplete == null || group.percentComplete < 0.9999) {
         incompleteProjectVariableGroups.push(group);
         }
         }
         });

         var encounters = ScheduledEncounter.query({
         customerId: authorizationContext.customerId,
         projectId: authorizationContext.projectId,
         siteId: authorizationContext.siteId,
         subjectId: authorizationContext.subjectId
         });
         $scope.data = $.extend(new BaseData(), {
         projectVariableGroups: summaries,
         incompleteProjectVariableGroups: incompleteProjectVariableGroups,

         encounters: encounters
         });
         $scope.data.init($routeParams, "summary", "");
         */
    }
})])
;
