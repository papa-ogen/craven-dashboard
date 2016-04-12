/*
    * If element has class .flyout, look for button in li element and attach click event to toggle ul list 
    * ul.flyout > li > <button> 
                <ul /> 
           /li
*/
(function( flyout, $, undefined ) { 
    "use strict"
    
    var containers = [];
    var buttons = [];

    flyout.init = function(container) {
        containers = $(container);
        buttons = $("li>button", containers);

        $.each(buttons, function () {
            var ul = $(this).next("ul");
                ul.addClass("hidden");
                $(this).click(function () {
                    ul.toggleClass("hidden");
                });
        });
    };
    
    removeClass = function () {
        $(containers).removeClass('factive');
    }

}( window.flyout = window.flyout || {}, jQuery ));

try { 
  flyout.init(".flyout");
} catch( e ) { 
  console.log( e.message ); 
}