app.controller('multiChapterController', function($scope, $http, service,appConst,$window, $location, $routeParams) {

     $scope.basepath = siteUrl;
   
     service.showLoader();
     var callback = function(){
     var url = $scope.basepath+'/schoollms/json/servicelist/'+$routeParams.containerId+'/'+$routeParams.serviceId;
     $http({
         method:"post",
         url:url,
         header:{
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
          
       var selectBoxes=$('input[name=chapter]:checked');
       
       if(selectBoxes.length == 0){
           alert('Please select at least one chapter');
           return;
       }
       var chaptersStr = "";
       angular.forEach(selectBoxes,function(item,index){
          
          chaptersStr += item.value;
           if(index !=(selectBoxes.length-1)){
               chaptersStr +=","
           };
       });
     if(appConst.dataMode == "lms"){
          if(selectBoxes.length == 1){
               var url = '/lms/mcq/index#test/'+chaptersStr+'/'+$scope.data.serviceId+'/single/1'
           }else{
                var url = '/lms/mcq/index#test/'+chaptersStr+'/'+$scope.data.serviceId+'/multiple/1'
          }
      }else{
           var url = '/lms/mcq/index#test/'+chaptersStr+'/'+$scope.data.serviceId+'/multiple/1'
      }
         // var url = '/lms/mcq/index#test/'+chaptersStr+'/'+$scope.data.serviceId+'/multiple/1'
          $window.open(appConst.siteUrl+url,"_blank");       
          
       }
       $scope.goBack = function(){
            location.href = siteUrl+"/schoollms/index/dashboard/"+$scope.data.bredcrumbs[1].rack_id+"#/chapterDetails/"+appConst.containerId
    }
       
   
     
});