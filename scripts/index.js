$(function(){
    $('.assignments > li').hover(function(){
        $(this).children('ul').slideToggle('fast', function() {
            // Animation complete.
        });
    });
});
