
if(typeof dashboardConfig == 'undefined') {
    $(".alert").html("<strong>Error!</strong> Please add a config.js file to the project.").removeClass("hidden");
};

(function( menu, $, config, undefined ) { 
    "use strict"
    
    var containers = [];
    
    menu.init = function (container) {
        containers = $(container);
        
        $.each(containers, function () {
            var container = this;
            var env = getEnvironment(this);
            
            // Title
            $("<h2>",
            {
                class: "dashboard-logo-" + $(container).attr("data-config-environment"),
                text: env.title
            }).appendTo(container);
            
            // Creating Accordion Wrapper
            var wrapper = $("<div>",
            {
                id: env.title,
                class: "panel-group"
            }).appendTo(container);
            
            // Elements
            $.each(env.credentials, function (i, val) {
                // Creating Panel
                var panel = $("<div>",
                {
                    class: "panel panel-default"  
                }).appendTo(wrapper);
                
                // Creating Panel Heading
                var heading = $("<div>",
                {
                    class: "panel-heading"  
                }).appendTo(panel);                
                
                // Creating Title
                var title = $("<h4>",
                {
                    "data-toggle": "collapse",
                    "data-parent": "#" + env.title,
                    "data-target": "#" + this.id + i,                     
                    class: "panel-title",
                    text: this.app
                }).appendTo(heading);                 
                
                // Creating content
                var content = $("<div>",
                {
                    id: this.id + i,
                    class: "panel-collapse collapse"
                }).appendTo(panel);  
                
                // Panel body
                var panelbody = $("<div>",
                {
                    class: "panel-body"
                }).appendTo(content);  
               
               if(this.url.length > 0) {
                   for(var i = 0; i < this.url.length; i++) {
                    createFormRow("URL", this.url[i]).appendTo(panelbody);
                   }
               }
               if(this.username.length > 0) createFormRow("Username", this.username).appendTo(panelbody);
               if(this.password.length > 0) createPasswordRow("Password", this.password).appendTo(panelbody);
               
               // Change Password type onlick and reset onblur on password input
               $('button', content).on('click', function (e) {                    
                    $("input:password", panel).attr('type', 'text').blur(function () {
                        $(this).attr('type', 'password');
                    }); 
                    
                    // Select entire password
                    $("input[type='text']", panel).click(function () {
                        $(this).select();
                    });
                });
            });
        });
        
        $("input[type='text']").click(function () {
            $(this).select();
        });
    };
    
    function createFormRow (label, data) {
        var labelId = label.toLowerCase();
        return $("<div class=\"form-group row\">" +
                   "<label for=\"" + labelId + "\" class=\"col-sm-2 form-control-label\">" + label + "</label>" +
                   "<div class=\"col-sm-10\">" +
                   "<input type=\"text\" class=\"form-control\" id=\"" + labelId + "\" value=\"" + data + "\" />" +
                   "</div>" + 
                   "</div>");
    };
    
    function createPasswordRow (label, data) {
        var labelId = label.toLowerCase();
        return $("<div class=\"form-group row\">" +
                   "<label for=\"" + labelId + "\" class=\"col-sm-2 form-control-label\">" + label + "</label>" +
                   "<div class=\"col-sm-8\">" +
                   "<input type=\"password\" class=\"form-control\" id=\"" + labelId + "\" value=\"" + data + "\" />" +
                   "</div>" +
                   "<div class=\"col-sm-2\"><button type=\"submit\" class=\"btn btn-primary\">Display</button></div>" + 
                   "</div>");
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
};