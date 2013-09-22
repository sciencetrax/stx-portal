(function () {
    "use strict";
    // this function is strict...
}());

var BaseController = Class.extend({
    init: function($scope) {
        $scope.LS = LS;
    }
});