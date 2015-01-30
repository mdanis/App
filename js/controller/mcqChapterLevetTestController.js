app.controller('mcqChapterLevetTestController',function($scope, $http,appConst,service,$location, $routeParams){
    service.showLoader();
    setTimeout(function(){service.hideLoader();},1000);
    $scope.showMcqLevelTestList = function(level){
        if(level=='single')
            $location.path('/mcqSingleChapterList/'+$routeParams.containerId+'/'+$routeParams.serviceId);
        else if(level=='practice')
            $location.path('/mcqPracticeChapterList/'+$routeParams.containerId+'/'+$routeParams.serviceId);
        else
             $location.path('/mcqMultiChapterList/'+$routeParams.containerId+'/431');
    }
})
