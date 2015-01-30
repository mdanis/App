app.controller('mcqSingleChapterListController',function($scope, $http,appConst,service,$location, $routeParams){
     $scope.siteUrl = siteUrl;
     service.showLoader();
     var callback = function(){
     $http({
         method:"post",
         url:siteUrl+"/"+appConst.dataUrl+"/json/servicelist/"+$routeParams.containerId+'/'+$routeParams.serviceId,
         headers: {
                    'Content-Type': 'application/json'
                }
     }).success(function(data){
         $scope.testListData = data;
         service.hideLoader();
     })
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
     $scope.showLevel = function(evt,url,params){         
           //service.updateService($scope.siteUrl+url,params); 
            location.hash = "#/testlevel/"+params.containerId+"/"+params.serviceId+"/"+params.type;
       }
})