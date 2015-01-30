app.controller('levelController', function($scope, $http, service,appConst,$window,$location, $routeParams) {
     service.showLoader();
     $scope.basepath = siteUrl;
     var callback = function(){
     var url = siteUrl+"/"+appConst.dataUrl+"/json/mcqlevel/"+$routeParams.containerId+"/"+$routeParams.serviceId+"/"+$routeParams.type;
      $http({
         method:"post",
         url:url,
         headers: {
                    'Content-Type': 'application/json'
                }
     }).success(function(data){
          $scope.data = data;
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
      $scope.showTest = function(url){    
          $window.open($scope.basepath+url, '_blank', 'width=1000,height=650');       
          
       }
       $scope.showInstruction = function(){
           $("#basic-modal-content").modal();
       }
   
     
});