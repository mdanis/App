app.controller('titlelistController', function($scope, $http, service,appConst, $location, $routeParams,$filter) {
   localStorage.setItem("serviceListType", location.hash.split('/')[1]);
    $scope.siteUrl = siteUrl;
    service.showLoader();
    var callback = function(){
     var parameters = $routeParams; 
     $scope.orderByAttribute = 'order';
     var url = "";
     var orderBy = $filter('orderBy');
     $scope.order = function(predicate, reverse) {
    $scope.titleListData = orderBy($scope.titleListData, predicate, reverse);
  };
     if(localStorage.getItem('titlelistData') === null)
     $http({
            method: "post",
            url: appConst.siteUrl+"/"+appConst.dataUrl+"/json/servicelist/"+$routeParams.containerId+'/'+$routeParams.serviceId
        }).success(function(data) {
            //service.getBreadscumData(data);
            if((data.Services == 'Animation' ||  data.Services == 'Multilingual Animation') && appConst.dataMode == 'lms'){
             location.hash = "#/animation-list/"+$routeParams.containerId+"/"+$routeParams.serviceId;
         }
         else{
             $scope.contentType = data.type;
             $scope.containerId = data.containerId ;
             $scope.serviceId = data.serviceId 
             $scope.predicate = 'order';
             $scope.reverse = true;
             $scope.titleListData = data.filedata;
             $scope.order('order',true);
             service.getBreadscumData(data);
             service.hideLoader();
         }
        });
        else{
            var data = JSON.parse(localStorage.getItem('titlelistData'));
             $scope.predicate = 'order';
             $scope.reverse = true;
             $scope.contentType = data.type;
             $scope.containerId = data.containerId ;
             $scope.serviceId = data.serviceId 
             $scope.titleListData = data.filedata;
             $scope.order('order',true);
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
     

       $scope.geContent = function(URL,params,isEnabled){
           service.showLoader();
           localStorage.clear();
         if(isEnabled == 0){
    	    $('.modal-backdrop').show();
            $('#exampleModa2').show();
          service.hideLoader();
        }
        else
           $http({
            method: "post",
           url:$scope.siteUrl + "/"+appConst.dataUrl+"/json/contentdetail/" + params.containerId + '/' + params.serviceId + '/' + params.contentId
        }).success(function(data) {
        if(data.type.toLowerCase() == 'unauthorized'){
            alert('Unauthorized User')
            // $('.modal-backdrop').show();
             //$('#exampleModa2').show();
        }
        else{
           params.containerId = $scope.containerId;
           service.showLoader();
            if (typeof data == 'object') {
                 if(data.type.toLowerCase() == 'file' || data.type.toLowerCase() == 'crs' || data.type.toLowerCase() == 'content'){
                     localStorage.setItem('contentData',JSON.stringify(data));
              var hash = "content/"+params.containerId +"/"+params.serviceId+'/'+params.contentId;
               location.hash = "#/"+hash;
                 }
              else if(data.type.toLowerCase() == 'titlelist'){
                  localStorage.setItem('titlelistData',JSON.stringify(data));
                  var hash = "titleList/"+params.containerId +"/"+params.serviceId;
                   location.hash = "#/"+hash;
              }
              else if(data.type.toLowerCase() == 'paper'){
                  localStorage.setItem('paperData',JSON.stringify(data));
                  var hash = "paper/"+params.containerId +"/"+params.serviceId+'/'+params.contentId;
                  location.hash = "#/"+hash;
                 }
                  else  if (data.type.toLowerCase() == 'lo') {
                      localStorage.setItem('loData',JSON.stringify(data));
                            var hash = "learning-objective/" + params.containerId + "/" + params.serviceId + '/' + params.contentId;
                           location.hash = "#/" + hash;
                        }
              else{
                  var hash = params.type+"/"+params.containerId +"/"+params.serviceId;
                   location.hash = "#/"+hash;
              }
            }
            else{
                  localStorage.setItem('contentData',JSON.stringify(data));
                  var hash = "content/"+params.containerId +"/"+params.serviceId+'/'+params.contentId;
                   location.hash = "#/"+hash;
            }
        }
           
        })
          

       }
});

app.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 }
});
