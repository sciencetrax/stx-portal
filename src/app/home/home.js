var HomeController;
(function () {
    "use strict";

    HomeController = AuthorizedBaseController.extend({
        SubjectVariableGroupSummary: null,
        ScheduledEncounter: null,

        init: function ($scope, SubjectVariableGroupSummary, ScheduledEncounter) {
            this._super($scope);
            this.SubjectVariableGroupSummary = SubjectVariableGroupSummary;
            this.ScheduledEncounter = ScheduledEncounter;
            this.getIncompleteVariableGroups();
            this.getScheduledEncounters();
        },

        getScheduledEncounters: function() {
            this.$scope.encounters = this.ScheduledEncounter.query({
                customerId: this.$scope.customerId,
                projectId: this.$scope.projectId,
                siteId: this.$scope.siteId,
                subjectId: this.$scope.subjectId
            });
        },

        getIncompleteVariableGroups: function() {
            var incompleteProjectVariableGroups = [];
            var summaries = this.SubjectVariableGroupSummary.query({
                customerId: this.$scope.customerId,
                projectId: this.$scope.projectId,
                siteId: this.$scope.siteId,
                subjectId: this.$scope.subjectId
            }, function () {
                    for (var index = 0; index < summaries.length; index++) {
                        var group = summaries[index];
                        if (group.percentComplete == null || group.percentComplete < 0.9999) {
                            incompleteProjectVariableGroups.push(group);
                        }
                    }
            });
            this.$scope.projectVariableGroups = summaries;
            this.$scope.incompleteProjectVariableGroups = incompleteProjectVariableGroups;
        }
    });
    HomeController.$inject = ['$scope', 'SubjectVariableGroupSummary', 'ScheduledEncounter'];

    angular.module('stx.home', [
            'stxWebServices',
            'ui.state'
        ])
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
        .controller("HomeController", HomeController)
    ;
}());


