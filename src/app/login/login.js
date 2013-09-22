var LoginController = BaseController.extend({
    $scope: null,
    init: function ($scope, $location, Authorization) {
        this._super($scope);
        $scope.$root.removeAuthorization();
        $scope.data = {
            authorization: new Authorization(),
            login: function() {
                this.authorization.portalCode = "pt";
                this.authorization.$save(function(result) {
                    $scope.$root.authenticate(result.authorization);
                    $location.path("/home/summary");
                }, function(response) {
                    var errorCode = response.data.errorCode;
                    bootbox.alert(LS.errorMessages.get(errorCode));
                });
            }
        };
    }
});
LoginController.$inject = ['$scope', '$location', 'Authorization'];