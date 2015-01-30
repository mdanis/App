app.config(function($routeProvider) {
    
            $routeProvider
                   .when('/question/:containerId/:serviceId', {
                            templateUrl : siteUrl+'/App/templates/schoollms/questionAnswerTemplate.html',
                            controller  : 'questionAnswerController'
                    })
                    .when('/chapterDetails/:containerId', {
                            templateUrl : siteUrl+'/App/templates/schoollms/mainServiceList.html',
                            controller  : 'mainServiceController'
                    })
                     .when('/titleList/:containerId/:serviceId', {
                            templateUrl : siteUrl+'/App/templates/schoollms/titleListTemplate.html',
                            controller  : 'titlelistController'
                    })
                   
                     .when('/content/:containerId/:serviceId/:contentId', {
                            templateUrl : siteUrl+'/App/templates/schoollms/contentTemplate.html',
                            controller  : 'contentController'
                    })
                      .when('/content/:containerId/:serviceId/', {
                            templateUrl : siteUrl+'/App/templates/schoollms/contentTemplate.html',
                            controller  : 'contentController'
                    })
                      .when('/paper/:containerId/:serviceId/:contentId', {
                            templateUrl : siteUrl+'/App/templates/schoollms/paperTemplate.html',
                            controller  : 'paperController'
                    })
                      .when('/service/:containerId/:serviceId', {//subservice
                            templateUrl : siteUrl+'/App/templates/schoollms/subserviceTemplate.html',
                            controller  : 'subserviceController'
                    })
                     .when('/test/:containerId/:serviceId', {//mcq  testlist
                            templateUrl : siteUrl+'/App/templates/schoollms/testListTemplate.html',
                            controller  : 'testListController'
                    })
                     .when('/testlevel/:containerId/:serviceId/:type', { //MCQ level new design 
                          //  templateUrl : siteUrl+'/App/templates/schoollms/levelTemplate.html',
                            templateUrl : siteUrl+'/App/templates/schoollms/mcqLevelTemplate.html',
                            controller  : 'levelController'
                    })
                     .when('/practicepaper/:containerId/:serviceId/:type', {
                            templateUrl : siteUrl+'/App/templates/schoollms/practicepaperTemplate.html',
                            controller  : 'practicepaperController'
                    })
                   
                    .when('/test-multi123/:containerId/:serviceId/', {//MCQ
                            templateUrl : siteUrl+'/App/templates/schoollms/multiChapterTemplate.html',
                            controller  : 'multiChapterController'
                    })
                     // ***** start MCQ  for new design ***********//
                      .when('/test-multi/:containerId/:serviceId/', {//MCQ
                            templateUrl : siteUrl+'/App/templates/schoollms/mcqMultiChapterListTemplate.html',
                            controller  : 'mcqMultiChapterListController'
                    })
                    .when('/mcq-test-level/:containerId/:serviceId/', {//MCQ
                            templateUrl : siteUrl+'/App/templates/schoollms/mcqChapterLevetTestTemplate.html',
                            controller  : 'mcqChapterLevetTestController'
                    })
                     .when('/mcqSingleChapterList/:containerId/:serviceId/', {//MCQ single
                            templateUrl : siteUrl+'/App/templates/schoollms/mcqSingleChapterListTemplate.html',
                            controller  : 'mcqSingleChapterListController'
                    })
                     .when('/mcqMultiChapterList/:containerId/:serviceId/', {//MCQ multiple
                            templateUrl : siteUrl+'/App/templates/schoollms/mcqMultiChapterListTemplate.html',
                            controller  : 'mcqMultiChapterListController'
                    })
                     .when('/mcqPracticeChapterList/:containerId/:serviceId/', {//MCQ practice
                            templateUrl : siteUrl+'/App/templates/schoollms/mcqPracticeChapterListTemplate.html',
                            controller  : 'mcqPracticeChapterListController'
                    })
                     .when('/practicepaper/:containerId/:serviceId/', {
                            templateUrl : siteUrl+'/App/templates/schoollms/practicepaperTemplate.html',
                            controller  : 'practicepaperController'
                    })
             .when('/get-set-go-intro/:containerId/:serviceId/', {  // get set go
                             templateUrl : siteUrl+'/App/templates/schoollms/getSetGoIntroTemplate.html',
                             controller  : 'getSetGoIntroController'
                   })
                   .when('/choose-get-set-go-level/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/schoollms/getSetGoChapterLevelTemplate.html',
                            controller  : 'getSetGoIntroController'
                    })
                  .when('/get-set-go-single-chapter/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/schoollms/gsgSingleLevelTemplate.html',
                            controller  : 'gsgChapterListController'
                    })
                    .when('/get-set-go-multi-chapter/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/schoollms/gsgMultipleLevelTemplate.html',
                            controller  : 'gsgChapterListController'
                    })
                     .when('/get-set-go-titlelist/:containerId/:serviceId/', {// get set go
                            templateUrl : siteUrl+'/App/templates/schoollms/chooseGsgTitleTemplate.html',
                            controller  : 'gsgTitleController'
                    })
                  
                     // ***** start MCQ  for new design ***********//
                     
                      .when('/animation-list/:containerId/:serviceId/', { // animation list for new design
                            templateUrl : siteUrl+'/App/templates/schoollms/animationListTemplate.html',
                            controller  : 'animationListController'
                    })
                     .when('/learning-objective/:containerId/:serviceId/:contentId', {
                            templateUrl : siteUrl+'/App/templates/schoollms/learningObjectiveTemplate.html',
                            controller  : 'learningObjectiveController'
                    })

	});
        

       

app.run(function($http,$rootScope,appConst,service,$route) {
   
    $rootScope.$on('$locationChangeStart', function($event, newUrl, oldUrl){
        if(!oldUrl) return;
       if(newUrl == oldUrl){
       }
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
     if(!current)return;
     var type =  current.originalPath.split("/")[1];
     var parameters = current.pathParams;  
     var url = "";
           appConst.startTime = "";
           appConst.containerId = parameters.containerId;  
           appConst.serviceId = parameters.serviceId;
           appConst.contentId = parameters.contentId
           appConst.containerid = parameters.containerId;  
           //service.hideLoader();
          
  });
});



	
	
        
      
