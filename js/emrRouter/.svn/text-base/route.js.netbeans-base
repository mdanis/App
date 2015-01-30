app.config(function($routeProvider,$locationProvider) {
    
            $routeProvider
                   .when('/question/:containerId/:serviceId', {
                            templateUrl : siteUrl+'/App/templates/website/questionAnswerTemplate.html',
                            controller  : 'questionAnswerController'
                    })
                    .when('/chapterDetails/:containerId', {
                            templateUrl : siteUrl+'/App/templates/website/chapterDataList.html',
                            controller  : 'mainServiceController'
                    })
                     .when('/titlelist/:containerId/:serviceId', {
                            templateUrl : siteUrl+'/App/templates/website/titleListTemplate.html',
                            controller  : 'titlelistController'
                    })
                     .when('/titleList/:containerId/:serviceId', {
                            templateUrl : siteUrl+'/App/templates/website/titleListTemplate.html',
                            controller  : 'titlelistController'
                    })
                     .when('/content/:containerId/:serviceId/:contentId', {
                            templateUrl : siteUrl+'/App/templates/website/contentTemplate.html',
                            controller  : 'contentController'
                    })
                      .when('/content/:containerId/:serviceId/', {
                            templateUrl : siteUrl+'/App/templates/website/contentTemplate.html',
                            controller  : 'contentController'
                    })
                      .when('/paper/:containerId/:serviceId/:contentId', {
                            templateUrl : siteUrl+'/App/templates/website/paperTemplate.html',
                            controller  : 'paperController'
                    })
                      .when('/service/:containerId/:serviceId', {//subservice
                            templateUrl : siteUrl+'/App/templates/website/subserviceTemplate.html',
                            controller  : 'subserviceController'
                    })
                     .when('/testlist/:containerId/:serviceId', {//MCQ
                            templateUrl : siteUrl+'/App/templates/website/testListTemplate.html',
                            controller  : 'testListController'
                    })
                     .when('/testlevel/:containerId/:serviceId/:type', {//MCQ
                            templateUrl : siteUrl+'/App/templates/website/levelTemplate.html',
                            controller  : 'levelController'
                    })
                     .when('/test-multi/:containerId/:serviceId/', {//MCQ
                            templateUrl : siteUrl+'/App/templates/website/multiChapterTemplate.html',
                            controller  : 'mcqMultiChapterListController'
                    })
                     .when('/practicepaper/:containerId/:serviceId/:type', {//MCQ
                            templateUrl : siteUrl+'/App/templates/website/practicepaperTemplate.html',
                            controller  : 'practicepaperController'
                    })
                    
                    .when('/multichapter/:containerId/:serviceId/', {
                            templateUrl : siteUrl+'/App/templates/website/multiChapterTemplate.html',
                            controller  : 'multiChapterController'
                    })
                .when('/get-set-go-intro/:containerId/:serviceId/', {  // get set go
                             templateUrl : siteUrl+'/App/templates/website/getSetGoIntroTemplate.html',
                             controller  : 'getSetGoIntroController'
                   })
                   .when('/choose-get-set-go-level/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/website/getSetGoChapterLevelTemplate.html',
                            controller  : 'getSetGoIntroController'
                    })
                  .when('/get-set-go-single-chapter/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/website/gsgSingleLevelTemplate.html',
                            controller  : 'gsgChapterListController'
                    })
                    .when('/get-set-go-multi-chapter/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/website/gsgMultipleLevelTemplate.html',
                            controller  : 'gsgChapterListController'
                    })
                     .when('/get-set-go-titlelist/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/website/chooseGsgTitleTemplate.html',
                            controller  : 'gsgTitleController'
                    })
                    
                   
                  


	});
        

       

app.run(function($http,$rootScope,appConst,service,$route) {
   
    $rootScope.$on('$locationChangeStart', function($event, newUrl, oldUrl){
  
         if(!oldUrl) return;
   
      var hash =   oldUrl.split("#")[1];
        if(!hash) return;
      var page = hash.split("/")[1];
      
          if(newUrl == oldUrl || appConst.startTime == ""){
             
              return;
          }
         
          
       appConst.stopTime = new Date();  
       
       var options = {
           "stopTime" :appConst.stopTime,
            "startTime" :appConst.startTime,
            "serviceId":appConst.serviceId,
            "containerId":appConst.containerId,
            "contentId":appConst.contentId,
            type:page
       }
      
      service.setMISTime(options);
        
    
  });
 
  $rootScope.$on('$routeChangeSuccess', function($event,current) {
      $("#tooltip").remove();
      if(!current)return;
    
    service.showLoader();
    
     var type =  current.originalPath.split("/")[1];
     var parameters = current.pathParams;   
           appConst.startTime = "";
           appConst.containerId = parameters.containerId;  
           appConst.serviceId = parameters.serviceId;
           appConst.contentId = parameters.contentId;
  });
  
  
});



	
	
        
      
