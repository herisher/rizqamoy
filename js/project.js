(function () {
    "use strict";

    /*========== Swipebox ==========*/

    $('.zoom-image').swipebox();

    /*========== Photo album ==========*/

    $(function () {

        $('.filter-album input[type=checkbox]').change(function(){

            var ids = [];

            $('.filter-album input[type=checkbox]').each(function(){

                if ($(this).is(':checked') && !$(this).hasClass('all-filter')){
                    ids.push($(this).attr('data-filter'));
                }

            });            

            if ($(this).is(':checked') && !$(this).hasClass('all-filter')){
                $('.all-filter').prop('checked', false);
            }

            if (ids.length === 0 || $('.all-filter').is(':checked')){

                $('.photo-album ul li').addClass('show-item').removeClass('hide-item');
                $('.filter-album input[data-filter]').prop('checked', false);

            }else{

                $('.photo-album ul li').each(function(){

                    var exists = false;
                        var filters = $(this).attr("data-tag").split(' ');
                        for (var i = 0; i <= filters.length; i++){
                            if ($.inArray(filters[i],ids) !== -1){
                                exists = true;
                            }
                        }
                    
                    if(exists === false){
                        $(this).removeClass('show-item').addClass('hide-item');
                    }
                    else{
                        $(this).removeClass('hide-item').addClass('show-item');
                    }
                });
                    
            }
    });


    var s;
    for (var i = 0; i < 11; i++){

            if ($('.filter-item').hasClass('span' + i)){
                s = i;
            }

            if($('div[role="main"]').attr('data-page') === '2'){
                if($.cookie('grid')){
                    $('.switcher-helper').attr("checked", 'checked');
                    $('.filter-item').removeClass('span' + s).addClass('span12');
                }
            }
    }

    $('.switcher-helper').change(function(){

        if ($(this).is(':checked')){
            $('.filter-item').removeClass('span' + s).addClass('span12').resize();
            $( '#masonry-box' ).masonry('reload');
            $.cookie("grid", "test");


        }
            

        else{
            $('.filter-item').removeClass('span12').addClass('span' + s).resize();
            $( '#masonry-box' ).masonry('reload');
            $.removeCookie("grid");
        }
            
    });
    
});

/*========== Countdown ========== */

$(function() {
    $('.cowntdown').countdown("2013/06/21", function(event) {
        var $this = $(this);
        switch(event.type) {
            case "seconds":
            case "minutes":
            case "hours":
            case "days":
            case "weeks":
            case "daysLeft":
                $this.find('b#'+event.type).html(event.value);
            break;
            case "finished":
                $this.hide();
            break;
        }
     });
});

/*========== Get direction ========== */

$(function () {
    var count = 0;

    $('.get-direction a').click(function(e){
        e.preventDefault();
        var map = $(this).parent().parent().parent().find('.wedding-image figcaption'),
            pos = parseInt(map.css('right').slice(0,-2));
        if(pos === 0){
            count++;
            if(count%2 === 1){
                map.css('right', 1000);
            }else{
                map.css('right', -1000);
            }
            $(this).html('Get directions');
        }else{
            map.css('right', 0);
            $(this).html('Hide map');
        }
    });
});

/*========== Tabs ========== */

$(function () {
    if($('.responsive-tabs').length > 0){
        RESPONSIVEUI.responsiveTabs();
    }
});

/*========== Home slider ========== */

$(function () {
    var slider = $('.slider-content'),
        next = $('.next-slider'),
        prev = $('.prev-slider'),
        ul = $('.slider-content ul'),
        slids = ul.find('li'),
        click = 0,
        custom_left,
        custom_right,
        conW,
        n,
        slideW,
        customR = function(){

                        if($(window).width() < 979){
                            n = 1;
                        }else if($(window).width() < 1200){
                            n = 2;
                        }else{
                            n = 3;
                        }
                        
                        conW = slider.outerWidth(true),
                        slideW = conW/n -21;

                        if(slids.length <= 3){
                            next.hide();
                            prev.hide();
                        }else{
                            
                            custom_left = function(e){
                                e.preventDefault();

                                if(click < slids.length - n){
                                    click++;
                                }else{
                                    click = 0;
                                }
                                
                                ul.css('margin-left', -(slideW + 21)*click);                                
                                
                            };

                            custom_right = function(e){
                                e.preventDefault();
                                if(click > 0){
                                    click--;
                                }else{
                                    click = slids.length -n;
                                }

                                ul.css('margin-left', -(slideW + 21)*click);
                            };
                        }

                        slids.css('width', slideW);
                        ul.css('margin-left', -(slideW + 21)*click);

                },
        call_at_interval_array = {},
        call_at_interval = function(callback,time){
            if(call_at_interval_array[callback]!==undefined){
                clearTimeout(call_at_interval_array[callback]);
                call_at_interval_array[callback] = setTimeout(callback,time);
            }else{
                callback();
                call_at_interval_array[callback] = 0;
            }
        };

        call_at_interval(customR,20);

        next.click(custom_left);

        prev.click(custom_right);

    $(window).resize(function(){
        call_at_interval(customR,20);
    });

});

/*========== People slider ========== */

var people = function () {
    var slider = $(this),
        box = slider.find('.slider-content-people'),
        next = slider.find('.next-slider-people'),
        prev = slider.find('.prev-slider-people'),
        ul = box.find('ul'),
        slids = ul.find('li'),
        click = 0,
        custom_left,
        custom_right,
        conW,
        len,
        slideW,
        customR = function(){
                        
                        conW = slider.width(),
                        slideW = conW/2,
                        len = slids.length;

                        if($(window).width() > 1200){
                            conW = slider.parent().width() * 0.3248945147679325;
                            slideW = conW/2;
                        }

                        if(len%2){
                            len =len+1
                        }

                        if(slids.length <= 2){
                            next.hide();
                            prev.hide();
                        }else{
                            
                            custom_left = function(e){
                                e.preventDefault();
                                if(click < len/2 - 2){
                                    click++;
                                }else{
                                    click = 0;
                                }
                                
                                ul.css('margin-left', -(slideW)*click);                                
                                
                            };

                            custom_right = function(e){
                                e.preventDefault();
                                if(click > 0){
                                    click--;
                                }else{
                                    
                                    click = len/2 - 2;
                                }

                                ul.css('margin-left', -(slideW)*click);
                            };
                        }
                        slids.css('width', slideW);
                        box.css('width', slideW*2);
                        box.css('height', slideW*2);
                        ul.css('width', slideW*len/2);
                        ul.css('margin-left', -(slideW + 21)*click);

                },
        call_at_interval_array = {},
        call_at_interval = function(callback,time){
            if(call_at_interval_array[callback]!==undefined){
                clearTimeout(call_at_interval_array[callback]);
                call_at_interval_array[callback] = setTimeout(callback,time);
            }else{
                callback();
                call_at_interval_array[callback] = 0;
            }
        };

        call_at_interval(customR,10);

        next.click(custom_right);

        prev.click(custom_left);

    $(window).resize(function(){
        call_at_interval(customR,10);
    });

};

$('.dark-section').each(people);

/*========== Shre hover photo ========== */

 if($('.socialized').length){
     $('.socialized').share({
        networks: ['email','pinterest','tumblr','googleplus','digg','in1','facebook','twitter','linkedin','stumbleupon'],
        theme: 'square'
    });
 }

 var wshare = function(e){
         e.preventDefault();
         var parent = $(this).parent().parent().parent().clone().contents().unwrap(),
             container = $('.share-photo');
         container.html(parent).slideDown('fast');
         container.append('<b class="close-button">&times;</b>');

         $('.close-button').click(function(){
             container.slideUp('fast');
         });

         function goToByScroll(id){
            id = id;
            $('html,body').animate({
                scrollTop: $("#"+id).offset().top},
                'slow');
        }

        goToByScroll(container.attr("id"));

 };

 $('.link-image').click(wshare);

 /*========== Wedding helper ========== */

 var round = function(){
         var hint = $(this),
             img = hint.find('.slider-people li figure a'),
             cont = hint.find('.round-frame');
             img.click(function(e){
                 e.preventDefault();
                 cont.find('a').replaceWith($(this).clone().addClass('zoom-image'));
                 cont.find('figcaption span').html($(this).parent().find('figcaption b').text()).hide().fadeIn('slow');
                 hint.find('.text-box h4 b').html($(this).parent().find('figcaption b span').text()).hide().fadeIn('slow');
                 hint.find('.text-box h4 + p').html($(this).parent().find('figcaption p').text()).hide().fadeIn('slow');
                 $('.zoom-image').swipebox();
             });
 }

    $('.wedding-hints').each(round);

/*========== Menu helper ========== */

$(function () {
    var sTop = function(){console.log();
        if(win.width() > 767){
            sTopF = function(){
                if(win.scrollTop() > 100){
                    var diff = 63+$('.main-footer').height()+$('.menu-wrapper').height()+42;
                    if(win.scrollTop() > $(document).height()-diff){
                        var delta = Math.min(0,$(document).height()-diff-win.scrollTop());
                        $('.menu-wrapper').addClass('static-menu span6');
                        $('.menu-side').addClass('static-menu');
                        $('.menu-wrapper').css('margin-top', delta);
                    }else{
                        $('.menu-wrapper').addClass('static-menu span6');
                        $('.menu-side').addClass('static-menu');
                        $('.menu-wrapper').css('margin-top', 0);
                    }
                    if(win.scrollTop() >= $(document).height()-win.height()-1)
                        $('.menu-side').removeClass('static-menu-full');
                    else
                        $('.menu-side').addClass('static-menu-full');
                }else{
                    $('.menu-wrapper').removeClass('static-menu span6');
                    $('.menu-side').removeClass('static-menu');
                    $('.menu-wrapper').css('margin-top', 0);
                }
            }
        }else{
            sTopF = function(){};
            $('.menu-wrapper').removeClass('static-menu span6');
            $('.menu-side').removeClass('static-menu');
            $('.menu-wrapper').css('margin-top', 0);
        }
        sTopF();
    },
    sTopF = function(){},
    win = $(window);

    win.scroll(function(){
        sTopF();
    });

    var call_at_interval_array = {},
    call_at_interval = function(callback,time){
        if(call_at_interval_array[callback]!==undefined){
            clearTimeout(call_at_interval_array[callback]);
            call_at_interval_array[callback] = setTimeout(callback,time);
        }else{
            callback();
            call_at_interval_array[callback] = 0;
        }
    };

        call_at_interval(sTop,10);

    $(window).resize(function(){
        call_at_interval(sTop,10);
    });
});

})();