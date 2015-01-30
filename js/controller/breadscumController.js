var checkBreadcum=0;
app.controller('breadscumController', function($scope, $http, service,appConst,$rootScope,$routeParams,$route) {
    if($route.current != undefined && $route.current != "undefined")
        var rootParams = $route.current.params;
     else
     var rootParams = {};
    $scope.siteUrl = appConst.siteUrl;
   var callback = function(){
    if(rootParams.contentId != undefined && rootParams.contentId != "undefined"){
       
    $http({
                method: "post",
                url: $scope.siteUrl+"/"+appConst.dataUrl+"/json/bredcrumbs/"+rootParams.containerId+'/'+rootParams.serviceId,//+'/'+rootParams.contentId,
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                        data = data.bredcrumbs;
                      
                        $scope.breadscumdetail = data;
                        $scope.classDetail = data[0].class;
                        $scope.subjectNode = {bgColor:data[2].color,trial:data[2].package_type,subjectRackId:data[2].rack_id,classId:data[1].rack_id,containerId:rootParams.containerId,serviceId:rootParams.serviceId,serviceListType:'other'};
                         if(!$scope.$$phase) {
                            $scope.$apply();
                         }
                   });
               }
     else if(rootParams.serviceId != undefined && rootParams.serviceId != "undefined"){
                
    $http({
                method: "post",
                url: $scope.siteUrl+"/"+appConst.dataUrl+"/json/bredcrumbs/"+rootParams.containerId+'/'+rootParams.serviceId,
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                        data = data.bredcrumbs;
                      
                        $scope.breadscumdetail = data;
                        $scope.classDetail = data[0].class;
                        $scope.subjectNode = {bgColor:data[2].color,trial:data[2].package_type,subjectRackId:data[2].rack_id,classId:data[1].rack_id,containerId:rootParams.containerId,serviceId:rootParams.serviceId,serviceListType:'other'};
                         if(!$scope.$$phase) {
                            $scope.$apply();
                         }
                   });
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
    $scope.$on("updateBreadscum", function(event, data) {
        data = data.bredcrumbs;
        $scope.breadscumdetail = data;
        $scope.classDetail = data[0].class;
        if($route.current.params.contentId != undefined && $route.current.params.contentId != "undefined")
        var serviceid = _.findWhere(data, {rack_type: 'service'}).rack_id;
  
        $scope.subjectNode = {bgColor:data[2].color,trial:data[2].package_type,subjectRackId:data[2].rack_id,classId:data[1].rack_id,containerId:rootParams.containerId,serviceId:serviceid,serviceListType:localStorage.getItem("serviceListType")};
       // alert(_.findWhere(data, {rack_type: 'service'}).rack_id)
        if(!$scope.$$phase) {
           $scope.$apply();
        }
       
    });
    $scope.addClasses = function(index,len){
        if(len-2==index)
            return 'secondLast';
        else
            return;
    }
    $scope.hrefExtraEdge = function(len,rackid){
    	if(len == 2){
    		location.href = $scope.siteUrl+'/schoollms/index/extra-edge/'+rackid;
    	}
    }
   
});