app.controller('gsgTitleController', function($scope, $http, service,appConst,$window,$routeParams) {
   $scope.basepath = appConst.siteUrl;
   service.showLoader();
    var callback = function(){
      var parameters = $routeParams; 
      var url = "";
      var url = $scope.basepath+'/'+appConst.dataUrl+'/json/topiclist/'+$routeParams.containerId+'/'+$routeParams.serviceId
        $http({
        method: "post",
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function(data) {
      if(data.topics.length > 0){
      $scope.data = data.topics;
     /* [
		{
			"chapter_id": 192326,
			"chapter_name": "Adjectives"
		}, {
			"chapter_id": 192347,
			"chapter_name": "Adverbs"
		}, {
			"chapter_id": 192369,
			"chapter_name": "Affixes"
		}
	]; */
      service.hideLoader();
      }
      else
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
       var testPage = "gsg";
       var url = '/'+appConst.dataUrl+'/mcq/'+testPage+'#test/'+chaptersStr+'/'+$routeParams.serviceId+'/single/1/topic'
        $window.open(appConst.siteUrl+url,"_blank","width=1000","heigth=600");  
    }
})
