app.controller('serviceContentController', function($scope,$http,appConst, $location, $routeParams,service) {
  //appConst.serviceListType = location.hash.split('/')[1];
  //localStorage.setItem("serviceListType", location.hash.split('/')[1]);
     appConst.siteUrl = siteUrl;
     
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
        service.setMISTime(options,function(){
             isComplete = true;  
         });
       
       if(!isComplete){
          return "We are capturing your progress report";
         }
       });
       
 });
