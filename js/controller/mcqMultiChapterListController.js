app.controller('mcqMultiChapterListController',function($scope, $http,appConst,service,$location, $routeParams,$window){
     $scope.siteUrl = siteUrl;
     service.showLoader();
     service.showLoader();
      var callback = function(){
     var parameters = $routeParams; 
     var url = "";
      //appConst.dataUrl = 'lms'
     var url = siteUrl+'/'+appConst.dataUrl+'/json/servicelist/'+$routeParams.containerId+'/'+$routeParams.serviceId;
     $http({
         method:"post",
         url:url,
         header:{
             'Content-Type': 'application/json'
         }
     }).success(function(data){
          $scope.data = data;
          service.hideLoader();
          appConst.serviceType = data.type;
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
     
     
   $scope.showTest = function(){ 
          
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
       var testPage = (appConst.serviceType == "gsg")?"gsg":"index";
     if(appConst.dataMode == 'lms'){
          if(selectBoxes.length == 1){
               var url = '/'+appConst.siteMode+'/mcq/'+testPage+'#test/'+chaptersStr+'/'+$scope.data.serviceId+'/single/1'
           }else{
                var url = '/'+appConst.siteMode+'/mcq/'+testPage+'#test/'+chaptersStr+'/'+$scope.data.serviceId+'/multiple/1'
          }
      }else{
           var url = '/'+appConst.siteMode+'/mcq/'+testPage+'#test/'+chaptersStr+'/'+$scope.data.serviceId+'/multiple/1'
      }
         // var url = '/lms/mcq/index#test/'+chaptersStr+'/'+$scope.data.serviceId+'/multiple/1'
          $window.open($scope.siteUrl+url,"_blank",'width=1000,height=650');       
          
       }
       $scope.goBack = function(){
           if(appConst.dataMode == 'lms')
              location.href = siteUrl+"/schoollms/index/dashboard/"+$scope.data.bredcrumbs[1].rack_id+"#/chapterDetails/"+$routeParams.containerId
         else if(appConst.dataMode == 'website')
              location.href = siteUrl+"/website/index/dashboard/"+$scope.data.bredcrumbs[1].rack_id+"#/chapterDetails/"+$routeParams.containerId
    }
})