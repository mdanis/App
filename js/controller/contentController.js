var site_url;
app.controller('contentController', function($scope, $http, service, appConst, $location, $routeParams) {
    $scope.loader = true;
    service.showLoader();
   site_url = $scope.siteUrl = siteUrl;
    $scope.showCurriculam = false;
    $scope.showQAlist = false;
    InternetSpeed();
    var callback = function(){
      service.updateNotification();
     var parameters = $routeParams; 
     var url = appConst.siteUrl + "/"+appConst.dataUrl+"/json/contentdetail/" + $routeParams.containerId + '/' + $routeParams.serviceId + '/' + $routeParams.contentId;
    if(localStorage.getItem('contentData') === null)  
    if ($routeParams.contentId != undefined && $routeParams.contentId != "undefined") {
        $http({
            method: "post",
            url: url
        }).success(function(data) {
            if (typeof data == 'object') {
            if (data.type.toLowerCase() == 'paper') {
                localStorage.setItem('paperData',JSON.stringify(data));
                var hash = "paper/" + $routeParams.containerId + "/" + $routeParams.serviceId + '/' + $routeParams.contentId;
                location.hash = "#/" + hash;
            }
             else  if (data.type.toLowerCase() == 'lo') {
                 localStorage.setItem('loData',JSON.stringify(data)); 
                            var hash = "learning-objective/" + $routeParams.containerId + "/" + $routeParams.serviceId + '/' + $routeParams.contentId;
                           location.hash = "#/" + hash;
                        }
            else {
                $scope.contentDataItem = data;
                $scope.showQAlist = true;
                appConst.startTime = new Date();
                $scope.setBreadscrumData();
                $(document).ready(function(){
                    service.loaderForContent();
                    servive.extraContent();
                })
               
            }
        }
        else
        {
                $scope.contentDataItem = data;
                $scope.showQAlist = true;
                appConst.startTime = new Date();
                $(document).ready(function(){
                    service.loaderForContent();
                    service.extraContent();
                })
                $scope.setBreadscrumData();
               
        }
           
        });
    }
    else{
       var url = appConst.siteUrl + "/"+appConst.dataUrl+"/json/contentdetail/" + $routeParams.containerId + '/' + $routeParams.serviceId ;
        $http({
            method: "post",
            url: url
        }).success(function(data) {
            //service.getBreadscumData(data);
            $scope.contentId = data.contentId;
            if ((data.Services == 'Animation' ||  data.Services == 'Multilingual Animation') && appConst.dataMode == 'lms')
            location.hash = '/animation-list/' + $routeParams.containerId + "/" + $routeParams.serviceId;
            else{
                var url = appConst.siteUrl + "/"+appConst.dataUrl+"/json/contentdetail/" + $routeParams.containerId + '/' + $routeParams.serviceId + '/' + data.contentId
                
                $http({
                    method: "post",
                    url: url
                }).success(function(data) {
                    if (typeof data == 'object') {
                        if (data.type.toLowerCase() == 'paper') {
                            var hash = "paper/" + $routeParams.containerId + "/" + $routeParams.serviceId + '/' + $scope.contentId;
                            location.hash = "#/" + hash;
                        }
                       else  if (data.type.toLowerCase() == 'lo') {
                            var hash = "learning-objective/" + $routeParams.containerId + "/" + $routeParams.serviceId + '/' + $scope.contentId;
                           location.hash = "#/" + hash;
                        }
                        else {
                            $scope.contentDataItem = data;
                            $scope.showQAlist = true;
                            appConst.startTime = new Date();
                           $(document).ready(function(){
                           	    servive.extraContent();
			                    service.loaderForContent();
			                })
			                $scope.setBreadscrumData();
                        }
                    }
                    else {
                        $scope.contentDataItem = data;
                        $scope.showQAlist = true;
                        appConst.startTime = new Date();
                       $(document).ready(function(){
                       	        servive.extraContent();
			                    service.loaderForContent();
			                })
			                $scope.setBreadscrumData();
                    }
                  
                })}
           
        }) 
    }
    else{
        var data = JSON.parse(localStorage.getItem('contentData'));
                $scope.contentDataItem = data;
                $scope.showQAlist = true;
                appConst.startTime = new Date();
               $(document).ready(function(){
			                    service.loaderForContent();
			                })
			                $scope.setBreadscrumData();
    }
    if(appConst.dataMode == 'lms')
         if(localStorage.getItem("extraEdge") != 'extra-edge')
             $scope.getUserType();
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
   
 
  $scope.setBreadscrumData = function(){
      $http({
                method: "post",
                url: $scope.siteUrl+"/"+appConst.dataUrl+"/json/bredcrumbs/"+$routeParams.containerId+'/'+$routeParams.serviceId,//+'/'+$routeParams.contentId,
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                       service.getBreadscumData(data);
                   });
  }
  $scope.getUserType = function(){
                $http({
                method: "post",
                url: $scope.siteUrl+"/schoollms/json/usertype",
                headers: {
                    'Content-Type': 'application/json'
                }
                   }).success(function(data) {
                      if(data.user_type == 'Student' || data.user_type == 'Parent')
                          $scope.showCurriculam = false;
                      else
                          $scope.showCurriculam = true;
                   }); 
 }
   
   $scope.showCarriculamDetail = function(){
       var url =  $scope.siteUrl+"/curriculum/index/createnewplan/"+$routeParams.containerId+"/"+$routeParams.serviceId+"/"+$routeParams.contentId;
       window.open(url);
   }
   
    $scope.$on("getAddNotesData",function(event,data){
        //alert(appConst.containerid+'=='+data.bredcrumbs[data.bredcrumbs.length-2].rack_id+'=='+data.bredcrumbs[2].rack_id)
        $scope.subjectId = data.bredcrumbs[2].rack_id;
        $scope.chapterId = data.bredcrumbs[data.bredcrumbs.length-2].rack_id;
        $scope.containerid = appConst.containerid;
        $scope.$apply();
    });
     $scope.$on("getAskQueData",function(event,data){
         $http({
                method: "post",
                url: appConst.siteUrl+"/notification/index/commentlists/"+$scope.chapterId
                   }).success(function(data) {
                       $scope.askQueData = data;
                   })
     });
  
  
  $scope.saveNotesService = function(){
        var containerId = $scope.containerid;
        var chapter_id = $scope.chapterId;
        var subjectId =  $scope.subjectId;
      //  alert($scope.containerid+' : '+$scope.chapterId+' : '+$scope.subjectId)
        var notes=$('#msgnote').val();
        if(notes==''){
            alert('You have not taken a note.'); return false;
        }else{
            var noteid=$('#hidnote_id').val();
            var prevnoteid=$('#hidPrevnote_id').val();
            if(noteid == 0 && prevnoteid ==0){ 
                var n_id='';
            }else{
                if(noteid == prevnoteid){
                    var n_id=noteid;
                }else{
                    var n_id='';
                }
            }
            $.ajax({
                type:'POST',
                url:   $scope.siteUrl+'/notification/index/notes',
                data:{containerId:containerId,notes:notes,chapter_id:chapter_id,type:'sevices',note_id:n_id,subjectId:subjectId},
                success: function(data){
                    $('#saveNotesSuccusses').html('Your note Saved..');
               
                    if(n_id==''){
                        $('#hidPrevnote_id').val(data.note_id);
                        if(noteid==0){
                            $('#hidnote_id').val(data.note_id);
                        }
                    }else{
                        $('#hidnote_id').val(data.note_id);
                    }
                  //  getallnoteslist('CBSE-5554-XI-5562','1','647','0','5637','Mathematics');/* board-board_id-class-class_id,status,user_id,param,subject_id,subject_name */
                    $('#saveNotesSuccusses').show().delay(1000).fadeOut();
                    $('#msgnote').val('');
                    setTimeout("writeNewNotes('service')",2000);
                
                }
            });
        }
    }
    
     $scope.commentPost =  function(){
        var containerId = $scope.containerid;
        var chapter_id = $scope.chapterId;
        var subjectId =  $scope.subjectId;
        $('#loadingPost').show();
        var boardid=$("#hidboardid").val();
        var classid=$("#hidclassid").val();	
        var commenttext=$("#comment_text").val();
        var totcount=$("#totPosts").val();
        var questionaskedtoarray = [];
        if ($(".add-quesBg input:checkbox:checked").length == 0)
        {
            alert("Please select checkbox");
            $('#loadingPost').hide();
            return false;
           
        }
        if(commenttext==""){
            alert("Please enter your comment.");
            $("#comment_text").focus();
              $('#loadingPost').hide();
            return false;
        }
                
        $(".add-quesBg input:checkbox").each(function(){
            var $this = $(this);

            if($this.is(":checked")){
                questionaskedtoarray.push($this.attr("id"));
            }
        });
                
                
        $.ajax({
            type:'POST',
            url:  $scope.siteUrl+'/notification/index/comments',
            data:{boardid:boardid,classid:classid,chapter_id:chapter_id,subjectId:subjectId,commenttext:commenttext,questionaskedtoarray:questionaskedtoarray},
            success: function(data){
                $('#loadingPost').hide();
                $("#comment_text").val('');
               // location.reload();
               // askques();
                $('#successquestion').html('Question Posted Sucessfully. ');
              //  $('#successquestion').show().delay(4000).fadeOut();
	          $("#comments").html(data);						
            }
        });
    }
});

function InternetSpeed(){
  	var imageAddr = site_url+'/images/comprehensive-package-banner.jpg' + "?n=" + Math.random();
        var startTime, endTime;
        var downloadSize = 171212.8;//1048576; //(1MB);//5616998;//
        var download = new Image();
        download.onload = function () {
        endTime = (new Date()).getTime();
        var duration = (endTime - startTime) / 1000; //Math.round()
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
   // alert("Your connection speed is: \n" +  speedBps + " bps\n"   +  speedKbps + " kbps\n" +  speedMbps + " Mbps\n" );
          if(speedKbps > 1024)
		  $("#netSpeed").text(speedMbps+' Mbps');
		  else
		  $("#netSpeed").text(speedKbps+' Kbps');
              // $('#netCalMsg').attr('onclick','recalculateSpeed()').css('cursor','pointer').html('Recalculate Speed : <img src="'+site_url+'/images/back_undo.png" />');
               $('#reChangeSpeed').show();
          
        }
        startTime = (new Date()).getTime();
        download.src = imageAddr;
  }
  function recalculateSpeed(){
  	$('#reChangeSpeed').hide();
	$('#netSpeed').html('<img  style="margin-top: 0px;" src="'+site_url+'/images/netLoader.gif">');
	setTimeout(function(){
	 InternetSpeed();
       },1000);
}