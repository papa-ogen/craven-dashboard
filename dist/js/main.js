(function( menu, $, config, undefined ) { 
    "use strict"
    
    var containers = [];
    
    menu.init = function (container) {
        containers = $(container);
        
        $.each(containers, function () {
            var env = getEnvironment(this);
            console.log("appending h2 to: ", this);
            $(this).append("<h2>" + env.title + "</h2>");
            
            // todo: add ul
$('<div>',
{
    id: 'test',
    name: 'test',
    class: 'test-class'
}).css(
{
    width: '100px',
    height: '100px',
    backgroundColor: '#fff'
});            
        });
    };
    
    function getEnvironment(container) {
            var env = $(container).attr("data-config-environment");
            return config[env];
    };
    
    function lookup (array, prop, value) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] && array[i][prop] === value) return array[i];
        }

        return null;
    };
}( window.menu = window.menu || {}, jQuery, dashboardConfig ));

try { 
  menu.init(".menu");
} catch( e ) { 
  console.log( e.message ); 
}

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
    
    function removeClass () {
        $(containers).removeClass('factive');
    }
}( window.flyout = window.flyout || {}, jQuery ));

try { 
  flyout.init(".flyout");
} catch( e ) { 
  console.log( e.message ); 
}