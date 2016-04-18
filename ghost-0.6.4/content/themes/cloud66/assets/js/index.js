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

        // utm cookie stuff
        var utm_cookie = null;
        if (window.docCookies.hasItem("utm")) {
            utm_cookie = JSON.parse(window.docCookies.getItem("utm"));
        }
        var utm = {
            utm_source: getURLParameter('utm_source'),
            utm_campaign: getURLParameter('utm_campaign'),
            utm_medium: getURLParameter('utm_medium'),
            utm_term: getURLParameter('utm_term'),
            utm_content: getURLParameter('utm_content')
        };
        // set cookie if 1. it doesn't exist or there is no cookie utm_source or 2. there are utm path params and no cookie utm_campaign
        if ((utm_cookie == null || utm_cookie['utm_source'] == null) || (utm['utm_campaign'] != null && utm_cookie['utm_campaign'] == null)) {
            // set default utm_source if null
            if (utm['utm_source'] == null) {
                utm['utm_source'] = 'blog';
            }
            window.docCookies.setItem("utm",JSON.stringify(utm), 2592000, "/", ".cloud66.com");
        }
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

    var getURLParameter = function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
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

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
