
app.controller("paperController", function($scope, $http, appConst, service, $location, $routeParams) {

    $scope.siteUrl = siteUrl;
    $scope.loader = true;
    $scope.showCurriculam = false;
    service.updateNotification();
    service.showLoader();
     var callback = function(){
     var parameters = $routeParams; 
     var url = "";
     if(localStorage.getItem('paperData') === null)
      $http({
        method: "post",
        url: appConst.siteUrl + "/"+appConst.dataUrl+"/json/contentdetail/" + $routeParams.containerId + '/' + $routeParams.serviceId + '/' + $routeParams.contentId
    }).success(function(data) {
        if (data.type == 'login') {
            getPopupForms('login');
            return;
        }
        else if (data.type == 'unauthorized') {
            location.href = appConst.siteUrl + "/"+appConst.siteMode+"/index/dashboard/" + data.containerId;
            return;
        }
        else
        {
            //service.getBreadscumData(data);
            $scope.headerData = data.paperinfo;
            $scope.queAnsData = data.paperinfo;
            service.hideLoader();
            $scope.questionsData = [];
            var questionsData = [];

            angular.forEach(data.paperinfo.sectiondata, function(sectiondata,index) {

            var data = [];
            angular.forEach(sectiondata.sectionquestion, function(ques) {
            var key  = ques.order;
            if(!data[key]){
            data[key] = [];
            }

            data[key].push(ques);


            });   
            var data1 = []
            var count = 0;
            angular.forEach(data, function(ques) {
            data1[count] = ques;
            count++;

            });  
            questionsData.push(data1);
            });
            $scope.questionsData   = questionsData;


            var totalMinutes = data.paperinfo.max_time.split(':')
            totalMinutes = (parseInt(totalMinutes[0])*60)+parseInt(totalMinutes[1])+parseInt(totalMinutes[2]/60);
            $scope.remainingTime = data.paperinfo.max_time;
            if(!$scope.$$phase) {
            $scope.$apply();
            }
            appConst.startTime = new Date();  
            setTimeout(function(){
            	if(appConst.dataMode == 'website')
                 $scope.Timer(totalMinutes);
            },100);
            $scope.setBreadscrumData();
           setTimeout(function(){
            	$(".custom-scroll-paper").mCustomScrollbar({
			theme : "minimal",
			advanced : {
				updateOnContentResize : true
			}
		    });
            },1000)
        }
    });
    else{
        var data = JSON.parse(localStorage.getItem('paperData'));
        if (data.type == 'login') {
            getPopupForms('login');
            return;
        }
        else if (data.type == 'unauthorized') {
            location.href = appConst.siteUrl + "/"+appConst.siteMode+"/index/dashboard/" + data.containerId;
            return;
        }
        else
        {
            //service.getBreadscumData(data);
            $scope.headerData = data.paperinfo;
            $scope.queAnsData = data.paperinfo;
            service.hideLoader();
            $scope.questionsData = [];
            var questionsData = [];

            angular.forEach(data.paperinfo.sectiondata, function(sectiondata,index) {

            var data = [];
            angular.forEach(sectiondata.sectionquestion, function(ques) {
            var key  = ques.order;
            if(!data[key]){
            data[key] = [];
            }

            data[key].push(ques);


            });   
            var data1 = []
            var count = 0;
            angular.forEach(data, function(ques) {
            data1[count] = ques;
            count++;

            });  
            questionsData.push(data1);
            });
            $scope.questionsData   = questionsData;


            var totalMinutes = data.paperinfo.max_time.split(':')
            totalMinutes = (parseInt(totalMinutes[0])*60)+parseInt(totalMinutes[1])+parseInt(totalMinutes[2]/60);
            $scope.remainingTime = data.paperinfo.max_time;
            if(!$scope.$$phase) {
            $scope.$apply();
            }
            appConst.startTime = new Date();  
            setTimeout(function(){
            if(appConst.dataMode == 'website')
            $scope.Timer(totalMinutes);
            },100);
            $scope.setBreadscrumData();
            setTimeout(function(){
            	$(".custom-scroll-paper").mCustomScrollbar({
			theme : "minimal",
			advanced : {
				updateOnContentResize : true
			}
		    });
            },1000);
            
		    
        }
    }
    if(appConst.dataMode == 'lms')
         if(localStorage.getItem("extraEdge") != 'extra-edge')
            $scope.getUserType();
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
   
    
    
   
    $scope.showAndHideAns = function(ppIndex, pIndex, index, condition)
    {
        if (condition == 'show') {
            jQuery('#showId_' + ppIndex + "_" + pIndex + "_" + index).hide();
            jQuery('#hideId_' + ppIndex + "_" + pIndex + "_" + index).show();
            jQuery('#ansShowId_' + ppIndex + "_" + pIndex + "_" + index).slideDown(500);
        }
        else {
            jQuery('#hideId_' + ppIndex + "_" + pIndex + "_" + index).hide();
            jQuery('#showId_' + ppIndex + "_" + pIndex + "_" + index).show();
            jQuery('#ansShowId_' + ppIndex + "_" + pIndex + "_" + index).slideUp(500);
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
    $scope.Timer = function(minutes) {
        var remainingTime = parseInt(minutes) * 60 * 1000;
        var timerId = setInterval(function() {
            remainingTime -= 1000;
            var hrs = Math.floor(remainingTime / (1000 * 60 * 60));
            var min = Math.floor(remainingTime % (1000 * 60 * 60) / (1000 * 60)).toFixed(0);
            var sec = Math.floor(((remainingTime % (1000 * 60 * 60)) % (1000 * 60)) / 1000)



            if (remainingTime < 0) {
                alert("Time Up");
                jQuery('.view-ans').css('pointer-events', 'auto');
                clearInterval(timerId);
                $scope.showResult();
            } else {
                $scope.remainingTime = hrs + " : " + min + " : " + sec;
                $scope.$apply();
            }

        }, 1000)

    }
$scope.setBreadscrumData = function(){
      $http({
                method: "post",
                url: $scope.siteUrl+"/"+appConst.dataUrl+"/json/bredcrumbs/"+$routeParams.containerId+'/'+$routeParams.serviceId,
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                       service.getBreadscumData(data);
                   });
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

  $scope.showCarriculamDetail = function(){
       var url =  $scope.siteUrl+"/curriculum/index/createnewplan/"+$routeParams.containerId+"/"+$routeParams.serviceId+"/"+$routeParams.contentId;
       window.open(url);
   }
   
   
   $scope.downloadPdf = function(){
    	 $http({
                method: "post",
                url: $scope.siteUrl+"/lms/index/checkdownloadpdf/"+$routeParams.containerId+"/"+$routeParams.serviceId+"/"+$routeParams.contentId,
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                   	if(data.type == 'unauthorized'){
                   		$('.modalDialog').removeClass('ng-hide').show();
        				$('#subscribed-pop').removeClass('ng-hide').show();
        				//location.href=$scope.siteUrl+"/lms/index/downloadpdf/"+$scope.containerId+"/"+$scope.serviceId+"/"+$scope.contentid;
                   	}
                   	else{
                   		location.href = $scope.siteUrl+"/lms/index/downloadpdf/"+$scope.containerId+"/"+$scope.serviceId+"/"+$scope.contentid;
                   	}
                   });
    }
});

