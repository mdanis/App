var app = angular.module('app', ["ngRoute"]);

app.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});