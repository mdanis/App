
app.controller('mainServiceController', function($scope, $http, appConst, service, $location, $routeParams,$rootScope) {
      service.showLoader();
      $scope.pdfShow = false;
      appConst.containerId = $routeParams.containerId;
     var callback = function(){
     var parameters = $routeParams; 
     var url = "";
     var url = appConst.siteUrl + "/"+appConst.dataUrl+"/json/dashboard/" + $routeParams.containerId;
    $http({
        method: "post",
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function(data) {
        $scope.urlParamsData = data;
        service.getBreadscumData(data);
        $scope.siteUrl = appConst.siteUrl;
        $scope.dashboardDetail = data.dashboard;
        setTimeout(function(){
            if(appConst.dataMode == 'website'){
              $scope.userType = data.bredcrumbs[2].package_type;
	          if(data.pdfdownload){
	               $scope.downloadPdf =  data.pdfdownload;
	               $scope.pdfShow = true;
	         }
	          else{
	               $scope.downloadPdf =  ' ';
	               $scope.pdfShow = false;
	          } 
                  updateTooltip();
              }
              else if(appConst.dataMode == 'lms'){
                   updateTooltip();
              }
            
            $('.ourService_icon').each(function(){
                if(parseInt($(this).height()) <= 122){
                    $(this).prev('a').hide();
                }
            })
        },100);
        service.hideLoader();
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
    

  $scope.showMoreServices = function(e){
      var node = e.currentTarget.parentNode;
      $(node).toggleClass('setHeightAuto')
	 var ulHeight = $(e.currentTarget).next('ul').height();
	if($(node).hasClass('setHeightAuto')){
		$(node).animate({height: ulHeight+"px"}, 500)
	    $(e.currentTarget).text('Collapse');
	}
	else{
	$(e.currentTarget).text('More');
	$(node).animate({height: "122px"}, 500)
	}
  }
    $scope.getServicedetail = function(url, param, isEnabled) {
    	 localStorage.clear();
         service.showLoader();
         localStorage.setItem("extraEdge", "study");
       if(isEnabled == 0){
    	    $('.modal-backdrop').show();
            $('#exampleModa2').show();
          service.hideLoader();
        }
        else{
         if(appConst.dataMode == 'website'){
             if($scope.userType == 'test')
               $('#buyNowModelPopup').text('Your subscription doesn’t have access to entire content. Subscribe now to avail full package.');
           else
               $('#buyNowModelPopup').text('Being a trial user you can only view first chapter of each subject.');
                   $('.globalToolTip').hide();
              }
              else if(appConst.dataMode == 'lms'){
              }
       
        $http({
            method: "post",
            url: appConst.siteUrl + '/'+appConst.dataUrl+'/json/get-service-info/' + param.containerId + '/' + param.serviceId,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
           if(data.type.toLowerCase() == 'unauthorized'){
               if(!appConst.isUserLogged){
                      getPopupForms('login')
                      service.updateLoginRedirectUrl();
                  }else{
                     $('.modal-backdrop').show();
                     $('#exampleModa2').show();
                  }
           }
           else{
            if (data.type.toLowerCase() == 'file' || data.type.toLowerCase() == 'crs' || data.type.toLowerCase() == 'content') {
                $scope.getInfoForAnimationAndPaper(param.containerId, param.serviceId);
            }
            else if (data.type.toLowerCase() == 'java-app') {
                var dataurl = $scope.urlParamsData.bredcrumbs;
                var newUrl = 'http://10.0.3.115:8080/extramarks/school/programming_skill/start.jsp?class='+dataurl[1].rack_name+'&subject='+dataurl[2].rack_name+'[C%2B%2B]&chapter='+dataurl[3].rack_name+'&class_id='+dataurl[1].rack_id+'&subject_id='+dataurl[2].rack_id+'&chapter_id='+dataurl[3].rack_id;
                //service.hideLoader();
                 location.href=newUrl;
            }
            else if (data.type.toLowerCase() == 'titlelist') {
               // $scope.getInfoForAnimationAndPaper(param.containerId, param.serviceId);
                if(appConst.dataMode == 'lms'){
                  var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/titleList/"+param.containerId +"/"+param.serviceId;
                   location.href=newUrl;
               }
               else if (appConst.dataMode == 'website'){
                    location.hash = "#/titleList/" + param.containerId + "/" + param.serviceId;
               }
            }
            else if (data.type.toLowerCase() == 'test'){
                 if(appConst.dataMode == 'lms'){
                  var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/mcq-test-level/" + param.containerId + "/" + param.serviceId;
                  location.href=newUrl;
               }
               else if (appConst.dataMode == 'website'){
                   location.hash = "#/testlist/" + param.containerId + "/" + param.serviceId;
               }
             }
            else if (data.type.toLowerCase() == 'gsg'){
                if(appConst.dataMode == 'lms'){
                 var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/get-set-go-intro/" + param.containerId + "/" + param.serviceId;
                 location.href=newUrl;
               }
               else if (appConst.dataMode == 'website'){
                   location.hash = "#/get-set-go-intro/" + param.containerId + "/" + param.serviceId;
               }
             }
            else{
                  if(appConst.dataMode == 'lms'){
                  var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/" + data.type + "/" + param.containerId + "/" + param.serviceId;
                  location.href=newUrl;
               }
               else if (appConst.dataMode == 'website'){
                   location.hash = "#/"+ data.type+"/" + param.containerId + "/" + param.serviceId;
               }
             }
         }
        });
    }

    };
    $scope.getInfoForAnimationAndPaper = function(containerId, serviceId) {
        $http({
            method: "post",
            url: appConst.siteUrl + '/'+appConst.dataUrl+'/json/servicelist/' + containerId + '/' + serviceId,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
            
            if ((data.Services == 'Animation' ||  data.Services == 'Multilingual Animation' ) && appConst.dataMode == 'lms') {
                var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/animation-list/"+containerId+"/"+serviceId;
                localStorage.setItem('animationData',JSON.stringify(data));
                location.href = newUrl;
            }
            else if(data.type.toLowerCase() == 'titlelist'){
                 if(appConst.dataMode == 'lms'){
                  var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/titleList/"+containerId +"/"+serviceId;
                   localStorage.setItem('titlelistData',JSON.stringify(data));
                   location.href=newUrl;
               }
               else if (appConst.dataMode == 'website'){
                    localStorage.setItem('titlelistData',JSON.stringify(data));
                    location.hash = "#/titleList/" + data.containerId + "/" + data.serviceId;
               }
            
            }
             else {
                var contentId = data.contentId;
                $http({
                    method: "post",
                    url: appConst.siteUrl + "/"+appConst.dataUrl+"/json/contentdetail/" + containerId + '/' + serviceId + '/' + contentId
                }).success(function(data) {
                    if (typeof data == 'object') {
                        if (data.type.toLowerCase() == 'paper') {
                           if(appConst.dataMode == 'lms'){
                                var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/paper/" + containerId + "/" + serviceId + '/' + contentId;
                                 localStorage.setItem('paperData',JSON.stringify(data));
                                 location.href=newUrl;
                      }
                      else if (appConst.dataMode == 'website'){
                            localStorage.setItem('paperData',JSON.stringify(data));
                            location.hash = "#/paper/" + containerId + "/" + serviceId;
                      }
                   }
                        else  if (data.type.toLowerCase() == 'lo') {
                           
                             if(appConst.dataMode == 'lms'){
                             var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/learning-objective/" + containerId + "/" + serviceId + '/' + contentId;
                            localStorage.setItem('loData',JSON.stringify(data));   
                            location.href=newUrl;
                      }
                      else if (appConst.dataMode == 'website'){
                            localStorage.setItem('loData',JSON.stringify(data));
                            location.hash = "#/learning-objective/" + containerId + "/" + serviceId + '/' + contentId;
                      }
                   }
                        else {
                               if(appConst.dataMode == 'lms'){
                               var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/content/" + containerId + "/" + serviceId + '/' + contentId;
                               localStorage.setItem('contentData',JSON.stringify(data));
                               location.href=newUrl;
                      }
                      else if (appConst.dataMode == 'website'){
                            localStorage.setItem('contentData',JSON.stringify(data));
                            location.hash = "#/content/" + containerId + "/" + serviceId + '/' + contentId;
                      }
                     }
                  }
                    else {
                           if(appConst.dataMode == 'lms'){
                               var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/content/" + containerId + "/" + serviceId + '/' + contentId;
                                localStorage.setItem('contentData',JSON.stringify(data));
                               location.href=newUrl;
                      }
                      else if (appConst.dataMode == 'website'){
                           localStorage.setItem('contentData',JSON.stringify(data));
                            location.hash = "#/content/" + containerId + "/" + serviceId + '/' + contentId;
                      }

                    }
                })
            }
             // service.hideLoader();
              
        })
    }
     $scope.getGroupClass = function(gpName){
    	if(gpName == 'Learn')
    	return 'learnService';
    	else if(gpName == 'Practice')
    	return 'practiceServic';
    	else if(gpName == 'Test')
    	return 'testService';
    	else
    	return 'learnService';
    }
     $scope.getTabClass = function(gpName){
    	if(gpName == 'Learn')
    	return 'learn-tab';
    	else if(gpName == 'Practice')
    	return 'practice-tab';
    	else if(gpName == 'Test')
    	return 'test-tab';
    	else
    	return 'learn-tab';
    }
    
});



             
                