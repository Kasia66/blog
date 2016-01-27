/**
* C66 blog Namespace
*/
var C66 = window.C66 || {};
    C66.blog  = {};

C66.blog = (function ( $, window ) {
    "use strict";

    var $document = $(document);
    // global config data
    var config = {
        $bannerEl: $('#js_banner'),
        bannerScrollClass: 'Banner--hasScrolled',
        amountToScoll: 10
    };

    var init = function() {
        console.log('C66.blog.init called');
        $("body").removeClass("preload");
        var $postContent = $(".post-content");
        $postContent.fitVids();
        bindEvents();
    };

    var bindEvents = function() {
        console.log('bindEvents method');
        if ( $(window).width() > 1023 ) {
            $document.scroll(function() {
                config.$bannerEl.toggleClass( config.bannerScrollClass, $document.scrollTop() >= config.amountToScoll );
            });
        }

        $('#js_toggle_side_menu, .nav-close').on("click", function(e){
            console.log('toggle class');
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

         if ( $(window).scrollTop() > 0 ) {
             $('#js_banner').addClass('Banner--hasScrolled');
         }
    };

    /* public methods */
    return {
        init: init,
    };

})( window.jQuery, window );

/* globals jQuery, document */
/* default ghost theme */
(function( $ ) {
    $(document).ready(function () {
        C66.blog.init();
        $(".scroll-down").arctic_scroll();
    });
})(jQuery);



(function( $ ) {
    "use strict";

    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
