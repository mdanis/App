app.service('service', function($http,appConst,$window,$rootScope) {
       var currentPageData = null;
       $(window).bind("beforeunload",function(e) {
          if(appConst.startTime == ""){
              return;
          }
       var hash =   location.hash.split("#")[1];
        if(!hash) return;
        
       var page = hash.split("/")[1];
       appConst.stopTime = new Date();
       var options = {
           "stopTime" :appConst.stopTime,
            "startTime" :appConst.startTime,
            "serviceId":appConst.serviceId,
            "containerId":appConst.containerId,
            "contentId":appConst.contentId,
            "type":page
       }
      var isComplete = false
         setMISTime(options,function(){
             isComplete = true;  
         });
       
       if(!isComplete){
                return "We are capturing your progress report";
         }
       });
   
    var getCurrentPageData = function() {
        return currentPageData;
    };
     var setCurrentPageData = function(data) {
         currentPageData = data;
    };
    
  
    var getBreadscumData = function(data)
    {
       setTimeout(function(){ $rootScope.$broadcast('updateBreadscum', data);},500);
    }
    
    var getChaptersByBreadscum = function(data){
       $rootScope.$broadcast('getchaptersdetail',data);
    }
    var updateAddNotes = function(data){
         $rootScope.$broadcast('getAddNotesData',data);
    }
    var updateAskQueData = function(data){
         $rootScope.$broadcast('getAskQueData',data);
    }
    var updateNotification = function(){
    $('#ProRight_pannel').addClass('container750');
    $('.profileNotification').hide();
    $('.notificationWithContent').show();
    }
     var updateLoginRedirectUrl = function(){
      $('#urlRedirect').val(location.href);
  }
  

  var loaderForContent = function(){
    var swfObj =  angular.element("#contentId").find("object");
    var swfObjId = angular.element("#contentId").find("object").attr('id');
    var swfData = angular.element("#contentId").find("object").attr('data');
    var iframe =  angular.element("#contentId").find("iframe");
  	if(iframe.length > 0){
                       angular.element(iframe).load(function(){
                       hideLoader();
                        });
                     }
     else if(swfObj.length > 0){
          swfobject.embedSWF(swfData, "hiddendiv", "750", "550", "9", false, false, false, false,function(e){
          	          if(e.success)
                         hideLoader();
                    else
                         hideLoader();
          });
      }
          else
          hideLoader();
  }
  var extraContent = function(){
  	            if(appConst.dataMode == 'website'){
  		        var txt = $('.comments'),
                hiddenDiv = $(document.createElement('div')),
                content = null;
                txt.addClass('txtstuff');
                hiddenDiv.addClass('hiddendiv common');
                $('body').append(hiddenDiv);
                txt.on('keyup', function () {
                content = $(this).val();
                content = content.replace(/\n/g, '<br>');
                hiddenDiv.html(content + '<br class="lbr">');
                $(this).css('height', hiddenDiv.height());
                });
  	}
  }
     var getLoginStatus = function(){
    	    $http({
            method: "post",
            url: appConst.siteUrl+"/lms/json/displayloginstatus",
            headers: {
                'Content-Type': 'application/json'
            }
           }).success(function(data) {
              appConst.mode = data.mode;
              appConst.isUserLogged = (data.type == "Not_login")? false:true;
              if(data.mode == 'website')
                  appConst.dataUrl = 'lms';
              else if(data.mode == 'lms')
                   appConst.dataUrl = 'lms';
              
                   return data.mode;
             });
    }
  var removeInlineStyle = function(data){
      if(typeof data == "string") {
          return data.replace(/style=.*?"/i, '');
      }else{
         var dataStr = JSON.stringify(data);
         dataStr = dataStr.replace(/style=".*?"/i, '');
         return JSON.parse(dataStr);
      }
  }
  
  var setMISTime = function(options,callback){
      
      var type = options.type;
      var isComplete = false;
      if(type != "content" && type != "paper" && type != "question"){
          return;
      }
      var timeTaken = options.stopTime - options.startTime;
      var sec =  ((timeTaken / 1000) % 60).toFixed(0);;
      var min =  ((timeTaken / (1000*60)) % 60).toFixed(0);
      var hrs   =  ((timeTaken / (1000*60*60)) % 24).toFixed(0);
       var timeStr = hrs+":"+min+":"+sec;
       var data = {
           "timeTaken":timeStr,
           "serviceId":options.serviceId,
            "containerId":options.containerId,
            "contentId" :options.contentId
           
       }
       console.log("MIS Data :: ",JSON.stringify(options))
       
        $http({
            method: "post",
            url: appConst.siteUrl+"/report/json/add-progress-report",
            data :data,
            async : true,
            cache : false,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(response) {
            isComplete = true;
           console.log("Report successfully saved.")
        }).error(function(){
              
             console.log("Report not saved.")
        });
       if(navigator.userAgent.toLowerCase().indexOf("chrome") >= 0 || !isComplete){
          
                return "We are capturing your progress report";
         
         }
       
  }
  /* *****************************************   update services ***************************** */
 

var handleFreeService = function(url,params,callback){
    
    if(!url) return;
    var newPageType = url.split("/")[0];
        var isLogged = false;
         $http({
                method: "post",
                url: appConst.siteUrl+"/lms/json/displayloginstatus",
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                       appConst.dataMode = data.mode;
                        if(data.mode == 'website'){
                        appConst.dataUrl = 'website';
                        appConst.siteMode = 'website';
                        }
                        else if(data.mode == 'lms'){
                             appConst.dataUrl = 'schoollms';
                             appConst.siteMode = 'schoollms';
                         }
                     appConst.isUserLogged = isLogged = (data.type == "Not_login")? false:true;
                     if(isLogged == false && (newPageType == "content" || newPageType == "paper" || newPageType == "question")){
                     
                     
                    
                     
                     var paramJson = {
                       "containerId" :params.containerId,
                       "serviceId":params.serviceId,
                       "contentId":params.contentId
                    }
                     
                     
                if(appConst.freeSeviceClassWise){
                      var free_service_details = localStorage.getItem("extramarks_free_service_"+appConst.classId);
                }else{
                      var free_service_details = localStorage.getItem("extramarks_free_service");
                }    
              
                if(free_service_details){
                    
                     free_service_details = angular.fromJson(free_service_details);
                    if(!(paramJson.containerId == free_service_details.containerId &&  
                       paramJson.serviceId == free_service_details.serviceId && 
                       paramJson.contentId == free_service_details.contentId) ){   
                              getPopupForms('login');
              
                       }else{
                           callback(); 
                       }
                }else{
                    var free_service_data = {
                        
                       "containerId" :paramJson.containerId,
                       "serviceId":paramJson.serviceId,
                       "contentId":paramJson.contentId
                    };
                    
                    
             if(appConst.freeSeviceClassWise){
                localStorage.setItem("extramarks_free_service_"+appConst.classId,angular.toJson(free_service_data));
           }else{
                       localStorage.setItem("extramarks_free_service",angular.toJson(free_service_data));
                }    
              
                   
               callback();
           }
           }else{
               callback();
           }
           
                 });
      
}
 var showLoader = function(){
       $("#preloader").show();	
    }
     var hideLoader = function(){
     $("#preloader").hide();
   }

 
  return {
    //updateService: updateService,
    getCurrentPageData : getCurrentPageData,
    setCurrentPageData:setCurrentPageData,
   // updatePage:updatePage,
    getBreadscumData:getBreadscumData,
    setMISTime:setMISTime,
    getChaptersByBreadscum:getChaptersByBreadscum,
    removeInlineStyle:removeInlineStyle,
    updateAddNotes:updateAddNotes,
    showLoader:showLoader,
    hideLoader:hideLoader,
    updateAskQueData:updateAskQueData,
    handleFreeService:handleFreeService,
    updateNotification:updateNotification,
    getLoginStatus:getLoginStatus,
    updateLoginRedirectUrl:updateLoginRedirectUrl,
    loaderForContent:loaderForContent,
    extraContent:extraContent
  };



});


