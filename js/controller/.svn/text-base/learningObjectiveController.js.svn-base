app.controller('learningObjectiveController', function($scope, $http, service,appConst,$rootScope,$routeParams,$route) {
    $scope.siteUrl = siteUrl;
    service.showLoader();
    var callback = function(){
         if(localStorage.getItem('loData') === null)
    $http({
        method: "post",
        url: $scope.siteUrl+"/schoollms/json/contentdetail/"+$routeParams.containerId+"/"+$routeParams.serviceId +"/"+ $routeParams.contentId
    }).success(function(data) {
        $scope.titleListData = data.description.split('~');
        service.hideLoader();
    })
    else{
      var data = JSON.parse(localStorage.getItem('loData'));  
       $scope.titleListData = data.description.split('~');
        service.hideLoader();
    }
   }
var newPage = location.hash.split("#/")[1];
    if(newPage){
        var newPageParams = newPage.split("/");
      var paramJson = {
                       "containerId" :newPageParams[1],
                       "serviceId":newPageParams[2],
                       "contentId":newPageParams[3]
                    }
     service.handleFreeService(location.hash.split("#/")[1],paramJson,callback);
    } 
})