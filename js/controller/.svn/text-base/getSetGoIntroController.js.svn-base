app.controller('getSetGoIntroController', function($scope, $http, service,appConst,$window,$routeParams) {
     $scope.basepath = appConst.siteUrl;
      service.showLoader();
     $scope.goToTest = function(level){
        if(level== 'goToLevel')
            location.hash =  location.hash = "#/choose-get-set-go-level/"+$routeParams.containerId+"/"+$routeParams.serviceId;
        else if(level == 'single'){
            location.hash =  location.hash = "#/get-set-go-single-chapter/"+$routeParams.containerId+"/"+$routeParams.serviceId;
        }
         else if(level == 'multiple'){
            location.hash =  location.hash = "#/get-set-go-multi-chapter/"+$routeParams.containerId+"/"+$routeParams.serviceId;
        }
    }
    var callback = function(){
              $http({
                method: "post",
                url: $scope.basepath+"/lms/json/bredcrumbs/"+$routeParams.containerId+'/'+$routeParams.serviceId,
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                         service.hideLoader();
                         service.getBreadscumData(data);
                   });
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