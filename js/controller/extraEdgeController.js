app.controller('extraEdgeController', function($scope,$http,appConst,service, $location, $routeParams) {
     service.showLoader();
     appConst.siteUrl = siteUrl;
     var loc = location.href.split("/");
     appConst.containerId = loc[loc.length-1];
    var url = appConst.siteUrl+"/schoollms/json/board-dashboard/" + appConst.containerId;
      $http({
            method: "post",
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
             $scope.siteUrl = appConst.siteUrl;
             $scope.dashboardDetail = data
             service.hideLoader();
        });
        
        $scope.getServicedetail = function(url,param,isEnabled){
        	localStorage.clear();
            localStorage.setItem("extraEdge", "extra-edge");
            localStorage.setItem("extraEdgeBreadscrumb", "extra-edge-Breadscrumb");
             service.showLoader();
        $http({
            method: "post",
            url: appConst.siteUrl + '/schoollms/json/get-service-info/' + param.containerId + '/' + param.serviceId,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
            if (data.type.toLowerCase() == 'file' || data.type.toLowerCase() == 'crs' || data.type.toLowerCase() == 'content') {
                //var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/content/"+param.containerId +"/"+param.serviceId;
                $scope.getInfoForAnimationAndPaper(param.containerId, param.serviceId);
            }
            else if (data.type.toLowerCase() == 'titlelist') {
                
                //var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/titlelist/"+param.containerId +"/"+param.serviceId;
                $scope.getInfoForAnimationAndPaper(param.containerId, param.serviceId);
            }
            else if (data.type.toLowerCase() == 'test'){
                var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/mcq-test-level/" + param.containerId + "/" + param.serviceId;
                 location.href=newUrl;
             }
            else if (data.type.toLowerCase() == 'gsg'){
                var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/gsgchapter/" + param.containerId + "/" + param.serviceId;
                 location.href=newUrl;
             }
            else{
                var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/" + data.type + "/" + param.containerId + "/" + param.serviceId;
                 location.href=newUrl;
             }
            service.hideLoader();

           

        })
            
        };
        
        $scope.getInfoForAnimationAndPaper = function(containerId, serviceId) {
        $http({
            method: "post",
            url: appConst.siteUrl + '/schoollms/json/servicelist/' + containerId + '/' + serviceId,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {
            if (data.Services == 'Animation' ||  data.Services == 'Multilingual Animation' ) {
                var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/animation-list/"+containerId+"/"+serviceId;
                location.href = newUrl;
            }
            else if(data.type.toLowerCase() == 'titlelist'){
            var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/titleList/"+containerId +"/"+serviceId;
            location.href=newUrl;
            }
             else {
                var contentId = data.contentId;
                $http({
                    method: "post",
                    url: appConst.siteUrl + "/schoollms/json/contentdetail/" + containerId + '/' + serviceId + '/' + contentId
                }).success(function(data) {
                    if (typeof data == 'object') {
                        if (data.type.toLowerCase() == 'paper') {
                            var newUrl = appConst.siteUrl + "/schoollms/index/content-detail#/paper/" + containerId + "/" + serviceId + '/' + contentId;
                            location.href=newUrl;
                        }
                        else {
                             var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/content/" + containerId + "/" + serviceId + '/' + contentId;
                             location.href=newUrl;
                        }
                    }
                    else {
                            var newUrl = appConst.siteUrl+"/schoollms/index/content-detail#/content/" + containerId + "/" + serviceId + '/' + contentId;
                             location.href=newUrl;

                    }
                })
            }
              service.hideLoader();
              
        })
    }
 });
