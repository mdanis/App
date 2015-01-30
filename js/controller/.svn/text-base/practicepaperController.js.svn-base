app.controller('practicepaperController', function($scope, $http, service,appConst,$window,$location, $routeParams) {
     service.showLoader();
     $scope.basepath = siteUrl;
  var callback = function(){
    var url =  siteUrl+"/"+appConst.dataUrl+"/json/mcqlevel/"+$routeParams.containerId+'/'+$routeParams.serviceId+'/'+$routeParams.type;
     $http({
            method: "post",
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
             $scope.data = data;
              service.hideLoader();
             appConst.startTime = new Date();  
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
      $scope.showTest = function(){   
          
        var url='/'+appConst.siteMode+'/mcq/index#test/'+$scope.data.containerId+'/'+$scope.data.serviceId+'/practice/1'
        $window.open(appConst.siteUrl+url, '_blank', 'width=1000,height=650');       
     
          
       }
      
     
});