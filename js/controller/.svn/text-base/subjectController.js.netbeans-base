

app.controller('subjectController', function($scope, $http,appConst,service,$filter)
{   
    $scope.pdfShow = false;
    $scope.siteUrl = appConst.siteUrl;
   
    
  /*  $scope.getServicedetail = function(URL,params,disabled) {
    $('.globalToolTip').hide();
    if(disabled  && disabled =="0" ){
        return;
    }
    appConst.serviceId = params.serviceId;
    appConst.serviceName =params.serviceName;
    service.updateService(appConst.siteUrl+URL,params)
    //service.updateBreadcums(params);
    }
   */
    /*
     $scope.onDataload = function(data){
         $scope.dashboardDetail = data.dashboard;
          if(data.pdfdownload){
               $scope.downloadPdf =  data.pdfdownload;
               $scope.pdfShow = true;
         }
         else{
               $scope.downloadPdf =  ' ';
               $scope.pdfShow = false;
         }
         service.hideLoader();
           service.getBreadscumData(data.bredcrumbs);
           setTimeout(function() {
                updateTooltip();
            }, 500);
    }
    */
    $scope.$on("updateChapterDetails", function(event, data) {
        $scope.onDataload(data);
      

    });
    
    $scope.getDefaultJson = function() {
   //  location.hash = "#/chapterDetails/"+appConst.rackId;
     
    }
  //$scope.getDefaultJson();
   
  $scope.showChapterList = function(id,bgColor,trial)
    {
    	  $http({
                method: "GET",
                url: siteUrl + "/"+appConst.dataUrl+"/json/containerlist/" + id+'/'+trial
            }).success(function(data) {
            	$('#subjectList').show();
                $scope.trial = trial;
                $scope.chapterSubject = data;
                $scope.chapterList = data.options;
                $scope.bgColor = bgColor;
                if(data.login == 1 && data.label == 'chapter'){
                     $http({
                     method: "GET",
                     url: siteUrl + "/"+appConst.dataUrl+"/json/progressreport/" +data.options[0].rack_id
                  }).success(function(data) {
                      if(data.data!=null)
                      angular.forEach($scope.chapterList, function(value, index) {
                                     if(_.findWhere(data.data, {rackId: value.rack_id})){
                                        $('#progressId_'+value.rack_id).css('width',_.findWhere(data.data, {rackId: value.rack_id}).progressReport+'%'); 
                                     }
				});
                   });
                }
                $('#subjectList li').eq(0).find('a').css('background-color',bgColor);
                $('.custom-scroll1').mCustomScrollbar("destroy")
                setTimeout(function()
                {  
                    $(".custom-scroll1").mCustomScrollbar({
						theme : "minimal",
						advanced : {
							updateOnContentResize : true
						}
					});
                }, 500);


            });
        
    };

    $scope.showChapterL = function(id,bgColor,trial)
    {
            $(".custom-scroll2").mCustomScrollbar("destroy");
                $http({
                    method: "GET",
                    url: siteUrl + "/"+appConst.dataUrl+"/json/containerlist/" + id+'/'+trial
                }).success(function(data) {
                	$('#subSubjectList').show();
                    $scope.chapterSubjectViseList = data;
                    $scope.showChapterViseListDetail = data.options;
                    $scope.bgColor = bgColor;
                    $scope.trial = trial;
                    if(data.login == 1 && data.label == 'chapter'){
                     $http({
                     method: "GET",
                     url: siteUrl + "/"+appConst.dataUrl+"/json/progressreport/" +data.options[0].rack_id
                  }).success(function(data) {
                       if(data.data!=null)
                      angular.forEach($scope.showChapterViseListDetail, function(value, index) {
                                     if(_.findWhere(data.data, {rackId: value.rack_id})){
                                        $('#progressId_'+value.rack_id).css('width',_.findWhere(data.data, {rackId: value.rack_id}).progressReport+'%'); 
                                     }
				});
                   });
                }
                $('#subSubjectList li').eq(0).find('a').css('background-color',bgColor);
                    setTimeout(function()
                    {   
                       $(".custom-scroll2").mCustomScrollbar({
						theme : "minimal",
						advanced : {
							updateOnContentResize : true
						}
					});
                    }, 500);

                });
    }

    $scope.showAnotherChapter1 = function(id, checkAnotherLeaf,bgColor,evt,trial)
    {
           $(".custom-scroll3").mCustomScrollbar("destroy");
          
            $http({
                method: "GET",
                url: siteUrl + "/"+appConst.dataUrl+"/json/containerlist/" + id+'/'+trial
            }).success(function(data) {
            	$('#chapterTopicList').show();
                $scope.chapterSubjectViseDetail = data;
                $scope.showChapterDetails = data.options;
                $scope.bgColor = bgColor;
                $scope.trial = trial;
                if(data.login == 1 && data.label == 'chapter'){
                     $http({
                     method: "GET",
                     url: siteUrl + "/"+appConst.dataUrl+"/json/progressreport/" +data.options[0].rack_id
                  }).success(function(data) {
                       if(data.data!=null)
                      angular.forEach($scope.showChapterDetail, function(value, index) {
                                     if(_.findWhere(data.data, {rackId: value.rack_id})){
                                        $('#progressId_'+value.rack_id).css('width',_.findWhere(data.data, {rackId: value.rack_id}).progressReport+'%'); 
                                     }
				});
                   });
                }
                 $('#chapterTopicList li').eq(0).find('a').css('background-color',bgColor);
                setTimeout(function()
                {
                   $(".custom-scroll3").mCustomScrollbar({
						theme : "minimal",
						advanced : {
							updateOnContentResize : true
						}
					});
                }, 500);
            });
    }
$scope.$on("showSubscribePopup", function(event, data) {
      $scope.showPopup = true;
});
$scope.$on('getchaptersdetail',function(event,data){
   
      if(checkBreadcum ==1){
      	     $('.overlay').show();
             bgColor = JSON.parse(data.subjectNode).bgColor;
             trial = JSON.parse(data.subjectNode).trial;
             if(data.secondLast == true && data.lastNode == 'service'){
                  appConst.rackId = data.rack_id;
                  location.hash = "#/chapterDetails/"+data.rack_id;
             }
             else if(data.rack_type == 'subject')
                 $scope.showChapterList(data.rack_id,bgColor,trial);
             else if(data.rack_type == 'sub subject'){
                 $scope.showChapterList(JSON.parse(data.subjectNode).subjectRackId,bgColor,trial);
                 $scope.showChapterL(data.rack_id,bgColor,trial);
             }
             else if(data.rack_type == 'chapter'){
                  $scope.showChapterList(JSON.parse(data.subjectNode).subjectRackId,bgColor,trial);
                 $scope.showChapterL(data.rack_id,bgColor,trial);
             }
             else{
                  appConst.rackId = data.rack_id;
                  location.hash = "#/chapterDetails/"+data.rack_id;
             }
              checkBreadcum++;
      }
     
  })
    $scope.showAnotherChapter2 = function(id, checkAnotherLeaf, ClassName)
    {
        // code for future append another leaf node
    };
    
    $scope.closePopup = function(){
    	$('.modalDialog').addClass('ng-hide').hide();
        $('#subscribed-pop').addClass('ng-hide').hide();
        $scope.showPopup = false;
    }
    
    $scope.showChapterDetail = function(id,checkleafnode,bgColor,evt) {
    	
      $('.subject-info, .overlay').hide();
     if(evt.target.classList.contains("unsubscribe")){
            $('.modal-backdrop').show();
            $('#exampleModa2').show();
        }
        else{
        appConst.rackId = id;
        location.hash = "#/chapterDetails/"+id;
       
     }
    };
});