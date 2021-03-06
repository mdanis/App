
app.controller("questionAnswerController", function($scope, $http,appConst,service,$location, $routeParams) {
    $scope.siteUrl = siteUrl;
    $scope.showCurriculam = false;
    $scope.loader = true;
    service.showLoader();
     var callback = function(){
     service.updateNotification();
     var parameters = $routeParams; 
     var url = "";
     var url = appConst.siteUrl+'/'+appConst.dataUrl+'/json/servicelist/'+$routeParams.containerId+'/'+$routeParams.serviceId;
     $http({
            method: "post",
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
            service.getBreadscumData(data);
            $scope.queAnsData = data.data;
            appConst.startTime = new Date();
            service.hideLoader();
             setTimeout(function(){
            	$(".custom-scroll-QA").mCustomScrollbar({
			theme : "minimal",
			advanced : {
				updateOnContentResize : true
			}
		    });
            },1000);
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
       

    $scope.getOrder = function(order){
        if(order == 1)
            return 'a.';
        else  if(order == 2)
            return 'b.';
        else  if(order == 3)
            return 'c.';
        else  if(order == 4)
            return 'd.';
        else 
            return '';
    }
    $scope.showAndHideAns = function(index, condition)
    {
        if (condition == 'show') {
            jQuery('#showId_' + index).hide();
            jQuery('#hideId_' + index).show();
            jQuery('#ansShowId_' + index).slideDown(500);
        }
        else {
            jQuery('#hideId_' + index).hide();
            jQuery('#showId_' + index).show();
            jQuery('#ansShowId_' + index).slideUp(500);
        }

    }
     $scope.viewAnswer = function(evt){
	  if ($.trim($(evt.target).text()) === 'View Answer') {
		  $(evt.target).text('Hide Answer');
		  } else {
		  $(evt.target).text('View Answer');        
		   }
		  $(evt.target).parents('.paper-block li').find('.answer-block').slideToggle();
  }
     $scope.getUserType = function(){
                $http({
                method: "post",
                url: $scope.siteUrl+"/schoollms/json/usertype",
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                      if(data.user_type == 'Student' || data.user_type == 'Parent')
                          $scope.showCurriculam = false;
                      else
                          $scope.showCurriculam = true;
                   }); 
 }
  if(localStorage.getItem("extraEdge") != 'extra-edge')
   $scope.getUserType();
    $scope.showCarriculamDetail = function(){
       var url =  $scope.siteUrl+"/curriculum/index/createnewplan/"+$routeParams.containerId+"/"+$routeParams.serviceId+"/"+$routeParams.contentId;
       window.open(url);
   }
});
