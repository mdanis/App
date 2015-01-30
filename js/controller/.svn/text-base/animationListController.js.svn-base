app.controller('animationListController', function($scope, $http, service, appConst, $location, $routeParams) {
    
    service.showLoader();
    $scope.siteUrl = appConst.siteUrl;
    $scope.animationIconPath='http://school.extramarks.com/content_data/crsemr/public/resources/video/';
    $scope.animationtab = true;
    $scope.otheranimationtab = false;
    $scope.searchtab = false;
    $scope.selected = 0;
    var callback = function(){
        if(localStorage.getItem('animationData') === null)
    $http({
            method: "post",
            url: appConst.siteUrl + "/schoollms/json/servicelist/" + $routeParams.containerId + '/' + $routeParams.serviceId
        }).success(function(data) {
            $scope.listOfAnimation = data.filedata;
             service.hideLoader();
        })
        else{
             var data = JSON.parse(localStorage.getItem('animationData'));
             $scope.listOfAnimation = data.filedata;
             service.hideLoader();
        }
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
        $scope.getAnimationContent = function(contentId){
        	localStorage.clear();
            $location.path('/content/'+$routeParams.containerId + '/' + $routeParams.serviceId+'/'+contentId);
        }
        $scope.showAnimationList = function(index){
        	 localStorage.clear();
             $scope.selected = index; 
             $scope.animationtab = true;
             $scope.otheranimationtab = false;
             $scope.searchtab = false;
        }
         $scope.showOtherAnimationList = function(index){
         	 localStorage.clear();
             $scope.count = $scope.count+1;
            
             service.showLoader();
             $scope.selected = index; 
             $scope.animationtab = false;
             $scope.otheranimationtab = true;
             $scope.searchtab = false;
            if($scope.count == 1) 
            $http({
            method: "post",
            url: appConst.siteUrl + "/schoollms/json/otherservicelist/" + $routeParams.containerId + '/' + $routeParams.serviceId
            }).success(function(data) {
               $scope.animationFileData = [];
               angular.forEach(data, function(value, key) {
                    angular.forEach(value.filedata, function(value, key) {
                    $scope.animationFileData.push(value);
                  });
               });
                $scope.listOfOtherAnimation = $scope.animationFileData;
                service.hideLoader();
            })
            else
               service.hideLoader(); 
        }
         $scope.showSearchList = function(index){
             $scope.selected = index; 
             $scope.animationtab = false;
             $scope.otheranimationtab = false;
             $scope.searchtab = true;
        }
        $scope.goToSearch = function(e){
           //  var node = e.currentTarget;
            service.showLoader();
            $http({
            method: "post",
            url: appConst.siteUrl + "/search/search/animation-search"+ '/'+$routeParams.containerId + '/'+$routeParams.serviceId,
            data:$('#searchInputField').val()
        }).success(function(data) {
            if(data.length > 0 ){
            $scope.listOfsearchAnimation = data;
           // $scope.$apply();
           }
           else
               alert("Record not found");
            service.hideLoader();
        })
        }
        $scope.goToSerchOnKeaup = function(e){
            if(e.keyCode == 13)
              $scope.goToSearch(e); 
        }
})