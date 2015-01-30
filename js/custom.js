/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    
    /* Login on enter */
    $('#passwdLogin').keyup(function(event){
        if(event.keyCode == 13)
            validateLogin();
    })
    
     jQuery("body").click(function(e) {
        var className = e.target.className;
        className = className.split(' ');
        if (e.target.className == '') {
            $('.labelAll').hide();
        }
        else if (e.target.className == "ng-binding" || e.target.className == "fancybox" || e.target.className == "menuAll") {

        }
        else if (className[0] == 'heading' || className[0] == 'menuAll' || className[0] == 'ng-binding' || className[0] == 'ng-scope') {

        }
        else
        {
            $('.labelAll').hide();
            jQuery('#subSubjectListing li').eq(0).removeAttr('checkHit');
            jQuery('#subSubjectChapterListing li').eq(0).removeAttr('checkHit');
             $('#openClass').slideUp();
        }

    });
})



function updateTooltip(){
    var targets = $('[rel~=tooltip]'),
                        target = false,
                        tooltip = false,
                        title = false;
                      
                targets.on('mouseenter', function()
                {
                    target = $(this);
                    tip = target.attr('data-title');
                    tooltip = $('<div id="tooltip" class="globalToolTip"></div>');

                    if (!tip || tip == '')
                        return false;

                    //target.removeAttr('title');
                    tooltip.css('opacity', 0)
                            .html(tip)
                            .appendTo('body');

                    var init_tooltip = function()
                    {

                        $(tooltip).delay("300");

                        if ($(window).width() < tooltip.outerWidth() * 1.5)
                            tooltip.css('max-width', $(window).width() / 2);
                        else
                            tooltip.css('max-width', 340);

                        var pos_left = target.offset().left + (target.outerWidth() / 2) - (tooltip.outerWidth() / 2),
                                pos_top = target.offset().top - tooltip.outerHeight() - 20;

                        if (pos_left < 0)
                        {
                            pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                            tooltip.addClass('left');
                        }
                        else
                            tooltip.removeClass('left');

                        if (pos_left + tooltip.outerWidth() > $(window).width())
                        {
                            pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                            tooltip.addClass('right');
                        }
                        else
                            tooltip.removeClass('right');

                        if (pos_top < 0)
                        {
                            var pos_top = target.offset().top + target.outerHeight();
                            tooltip.addClass('top');
                        }
                        else
                            tooltip.removeClass('top');

                        tooltip.css({left: pos_left, top: pos_top})
                                .animate({top: '+=10', opacity: 1}, 50);
                    };

                    init_tooltip();
                    $(window).resize(init_tooltip);

                    var remove_tooltip = function()
                    {
                        tooltip.hide();
//                        tooltip.animate({top: '-5', opacity: 0}, 50, function()
//                        {
//                            //$(this).remove();
//                        });

                        target.attr('data-title', tip);
                    };

                    target.on('mouseleave', remove_tooltip);
                    tooltip.on('click', remove_tooltip);
                });
}



function updateNotification(type){
    if(type == 'content' || type == 'question' || type == 'paper'){
         $('#ProRight_pannel').addClass('container750'); 
         $('.profileNotification').hide();
         $('.notificationWithContent').show(); 
    }
    else{
         $('.last').remove();
         $('#ProRight_pannel').removeClass('container750'); 
         $('.profileNotification').show();
         $('.notificationWithContent').hide(); 
    }
}

 function postsPrevious(chapter_id,subjectId,type,currentPage,resultsPerPage){				
        $.ajax({			
            type:'POST',
            url:   BASE_URL+'/notification/index/commentlists',
            data:{currentPage:currentPage,resultsPerPage:resultsPerPage,chapter_id:chapter_id,subjectId:subjectId,type:type},
            success: function(data){				
                if(data){
                    $("#comments").html(data);
                }
            }
        });		
    }
    function postsNext(chapter_id,subjectId,type,currentPage,resultsPerPage){		
        $.ajax({			
            type:'POST',
            url:   BASE_URL+'/notification/index/commentlists',
            data:{currentPage:currentPage,resultsPerPage:resultsPerPage,type:type,chapter_id:chapter_id,subjectId:subjectId},
            success: function(data){				
                if(data){					
                    $("#comments").html(data);		
                }
            }
        });		
    }

function postQuestion(questionid,userid,replyCount){
        var postReply=$("#replyAnswer"+questionid).val();	
        if(postReply==""){
            alert("Plese enter reply maessage"); 
            $("#replyAnswer"+questionid).focus();return false;
        }
        $.ajax({			
            type:'POST',
            url:   BASE_URL+'/notification/index/replyadd',
            data:{userid:userid,questionid:questionid,replymessage:postReply},
            success: function(data){
                if(data.output=='success'){					
                    $("#postReply"+questionid).toggle();
                    $("#countReplys"+questionid).html(data.count_reply);
                    $("#replyAnswer"+questionid).val('');	
                }
            }
        });	
    }
 
 function replyAnswer(questionid)
  {
        $("#postReply"+questionid).toggle();
        $("#replyAnswers"+questionid).hide();
  }
  
  function replyQuestion(userid,questionid){
        $("#postReply"+questionid).hide();
        $("#replyAnswers"+questionid).toggle();
        $.ajax({			
            type:'POST',
            url:   BASE_URL+'/notification/index/replyQuestion',
            data:{userid:userid,questionid:questionid},
            success: function(data){
                if(data){					
                    $("#replyAnswers"+questionid).html(data);	
                }
            }
        });	
    }  