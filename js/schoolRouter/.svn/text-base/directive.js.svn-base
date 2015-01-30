/* ***********  slideDown and slideUp for classes and other show hide functionality *********** */
app.directive('slideToggle', function() {
    return {
        restrict: 'A',
        scope: {},
        controller: function($scope) {
        },
        link: function(scope, element, attr) {
            element.bind('click', function() {
                $('#subsubject').hide();
                $('#subsubjectchapters').hide();
                $('#thirdLevelChapter').hide();
                $('.addNotesinput').val('');
                if (element.attr('class').indexOf('askQue') >= 0)
                    $('.add-quesBg').hide();
                else if (element.attr('class').indexOf('addNotes') >= 0)
                    $('.add-notesBg').hide();
                var $slideBox = angular.element(attr.slideToggle);
                var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;
                $slideBox.stop().slideToggle(slideDuration);
            });
        }
    };
});
/* *********************  click directive used for breadscum ********************** */
app.directive("click", function(service) {
    return {
        scope: {breadscumList: '=click'},
        link: function(scope, element, attrs) {
            element.bind("click", function() {
//                if (appConst.dataMode == 'website') {
//                    if (element.attr('class').indexOf('secondLast') >= 0) {
//                        var secondLast = true;
//                        var lastNode = $('.last').attr('name');
//                    }
//                    else
//                        var secondLast = false;
//                    data = {rack_id: scope.breadscumList.rack_id, rack_type: scope.breadscumList.rack_type, subjectNode: element.attr('subjectNode'), lastNode: lastNode, secondLast: secondLast}
//                    if (element.attr('class').indexOf('last') < 0) {
//                        checkBreadcum = 1;
//                        service.getChaptersByBreadscum(data);
//                    }
//                }
//                else if (appConst.dataMode == 'lms') {
                    if (angular.element().index() == -1 && element.attr('class').indexOf('last') < 0) {
                        location.href = siteUrl + "/schoollms/index/dashboard/" + JSON.parse(element.attr('subjectNode')).classId + "#/chapterDetails/" + JSON.parse(element.attr('subjectNode')).containerId;
                    }
                    else if (element.attr('class').indexOf('secondLast') >= 0) {
                        var secondLast = true;
                        var lastNode = $('.last').attr('name');
                    }
                    else
                        var secondLast = false;
                    data = {rack_id: scope.breadscumList.rack_id, rack_type: scope.breadscumList.rack_type, subjectNode: element.attr('subjectNode'), lastNode: lastNode, secondLast: secondLast}
                    if (element.attr('class').indexOf('last') < 0) {
                        checkBreadcum = 1;
                    }

//                }
            })
        }
    }
})