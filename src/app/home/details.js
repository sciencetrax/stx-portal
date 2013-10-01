(function () {
    "use strict";
    angular.module('stx.home.details', [
            'stx.core'
        ])
        .controller("DetailsController", ['$scope', 'Account', 'SecurityService',
            function ($scope, Account, SecurityService) {
            $scope.LSPage = $scope.$parent.LSPage.details;
        }])
    ;
}());


