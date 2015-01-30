app.controller('gsgChapterListController', function($scope, $http, service,appConst,$window,$routeParams) {
     $scope.basepath = appConst.siteUrl;
     service.showLoader();
var callback = function(){
     var parameters = $routeParams; 
     var url = "";
     var url = $scope.basepath+'/'+appConst.dataUrl+'/json/servicelist/'+$routeParams.containerId+'/'+$routeParams.serviceId
        $http({
        method: "post",
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function(data) {
    	
      $scope.data = data;
      service.getBreadscumData(data);
      service.hideLoader(); 
       angular.forEach(data.chapters, function(value,key) {
       if(value.chapter_id == $routeParams.containerId){
       	//alert(value.chapter_id)
       	setTimeout(function(){document.getElementById('chapter_'+value.chapter_id).checked = true;},1000);
       }
         
       });
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

    $scope.showTopic = function(){
          
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
       var testPage = "gsg";
       var url = $scope.basepath+'/'+appConst.dataUrl+'/json/topiclist/'+$routeParams.containerId+'/'+$routeParams.serviceId
        $http({
        method: "post",
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function(data) {
       // alert(JSON.stringify(data))
        if(data.topic == 'false'){
           
            var testPage = "gsg";
            if(selectBoxes.length == 1)
               var url = '/lms/mcq/'+testPage+'#test/'+chaptersStr+'/'+$scope.data.serviceId+'/single/1/chapter';
           else
               var url = '/lms/mcq/'+testPage+'#test/'+chaptersStr+'/'+$scope.data.serviceId+'/multiple/1/chapter';
          
            
            $window.open(appConst.siteUrl+url, '_blank', 'width=1000,height=650');  
        }
        else{
             location.hash = '#/get-set-go-titlelist/'+chaptersStr+'/'+$scope.data.serviceId
        }
    })
      
       
    }
 });