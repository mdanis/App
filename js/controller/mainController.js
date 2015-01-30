app.controller('mainController', function($scope,$http,appConst, $location, $routeParams) {
     appConst.siteUrl = siteUrl;
     appConst.rackId = rackId;
     appConst.classId = location.href.split("#")[0].split("dashboard/")[1];
   
    // appConst.boardName = boardName;
     //appConst.className = className;
     //$location.path("/"+boardName+"-"+className+"/"+appConst.rackId);
      $http({
            method: "post",
            url: appConst.siteUrl+"/lms/json/displayloginstatus",
            headers: {
                'Content-Type': 'application/json'
            }
           }).success(function(data) {
              appConst.dataMode = data.mode;
              appConst.isUserLogged = (data.type == "Not_login")? false:true;
              if(data.mode == 'website'){
                  appConst.dataUrl = data.mode;// get json data
                  appConst.siteMode = 'website';// redirect url (browser)
              }
              else if(data.mode == 'lms'){
                   appConst.dataUrl = 'schoollms';// get json data
                   appConst.siteMode = 'schoollms';// redirect url (browser)
               }
                 if(location.hash.split('/')[1] == 'undefined' || location.hash.split('/')[1] == undefined || location.hash.split('/')[1] == 'chapterDetails'){
                 	setTimeout(function(){location.hash = "#/chapterDetails/"+appConst.rackId;},100);
                 }
                 
            
             });
     $scope.showChapterDetail = function(rackid){
        location.hash = "/chapterDetails/"+rackid;
     }
 });
