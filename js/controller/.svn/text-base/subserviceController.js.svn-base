app.controller('subserviceController', function($scope, $http, service,appConst,$location, $routeParams) {
   localStorage.setItem("serviceListType", location.hash.split('/')[1]);
    $scope.siteUrl = siteUrl;
     service.showLoader();
     var callback = function(){
     var parameters = $routeParams; 
     var url = "";
     var url = $scope.siteUrl+'/'+appConst.dataUrl+'/json/servicelist/'+$routeParams.containerId+'/'+$routeParams.serviceId;
     $http({
        method:"post",
        url:url,
        header:{
            'Content-Type': 'application/json'
        }
    }).success(function(data){
       // service.getBreadscumData(data);
        $scope.container_id = data.container_id;
        $scope.serviceList = data.data;
        service.getBreadscumData(data);
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
   
  

   
    $scope.getServicedetail = function(URL,params,isEnabled) {
         service.showLoader();
         localStorage.clear();
         if(isEnabled == 0){
    	 $('.modalDialog').removeClass('ng-hide').show();
         $('#subscribed-pop').removeClass('ng-hide').show();
          service.hideLoader();
        }
        else{
        var url = $scope.siteUrl+'/'+appConst.dataUrl+'/json/servicelist/'+params.containerId+'/'+params.serviceId;
        $http({
        method:"post",
        url:url,
        header:{
            'Content-Type': 'application/json'
        }
    }).success(function(data){
       if(data.type.toLowerCase() == 'file' || data.type.toLowerCase() == 'crs' || data.type.toLowerCase() == 'content'){
          
              var hash = "content/"+params.containerId +"/"+params.serviceId+'/'+data.contentId;
          }
              else if(data.type.toLowerCase() == 'titlelist'){
                  
                  var hash = "titleList/"+data.containerId +"/"+data.serviceId;
              }
              else if(data.type.toLowerCase() == 'paper'){
                 
                  var hash = "paper/"+params.containerId +"/"+params.serviceId+'/'+data.contentId;
              }
               else  if (data.type.toLowerCase() == 'lo') {
                    
                            var hash = "learning-objective/" + params.containerId + "/" + params.serviceId + '/' + data.contentId;
                           location.hash = "#/" + hash;
               }
              else
                  var hash = data.type.toLowerCase()+"/"+params.containerId +"/"+params.serviceId;
               service.hideLoader();
              // location.href = newUrl;
              location.hash = "#/"+hash;
    })
}
      
    }
});
