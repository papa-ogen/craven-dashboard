if(typeof dashboardConfig == 'undefined') {
    var exampleFormat = "<pre>var dashboardConfig = [\n" +
                        "\t{\n" +
        "\t\ttitle: \"Epi-server\",\n" +
        "\t\tcredentials: [\n" +
            "\t\t{\n" +
                "\t\t\tid: \"teamcity\",\n" +
                "\t\t\tapp: \"Team City\",\n" + 
                "\t\t\turl: [\"http://teamcity.openpages:8888\"],\n" +
                "\t\t\tusername: \"username\",\n" +
                "\t\t\tpassword: \"password\"\n" +
            "\t\t},\n" +
            "\t\t{\n" +
                "\t\t\tid: \"octopus\",\n" +
                "\t\t\tapp: \"Octopus\",\n" +
                "\t\t\turl: [\"http://octopus.openpages:8080/app#/users/sign-in\"],\n" +
                "\t\t\tusername: \"username\",\n" +
                "\t\t\tpassword: \"password\"\n" +         
            "\t\t}\n" +
            "\t\t]\n" +
            "\t}\n" +
            "]" +
            "</pre>";
    $(".alert").html("<strong>Error!</strong> Please add a config.js file to the project." + exampleFormat).removeClass("hidden");
} else {

    (function( dashboardLinks, $, config, undefined ) { 
        "use strict"
        
        var environments = config.length;
        
        dashboardLinks.init = function (container) {
            var container = $(container);
            
            var row = addRow().appendTo(container);
            
            config.forEach(function(element, index) {
                if(index % 3 == 0 && index != 0) {
                    row = addRow().appendTo(container);
                }
               // Add environment column
               var col = addColumn(element);
               col.appendTo(row);
               
                // Creating Accordion Wrapper
                var wrapper = $("<div>",
                {
                    id: element.title,
                    class: "panel-group"
                }).appendTo(col);
                
                // Sort Credentials
                element.credentials.sort(function(a, b) {
                    return a.app.localeCompare(b.app);
                });
                
                // Elements
                $.each(element.credentials, function (i, val) {
                    // Creating Panel
                    var panel = $("<div>",
                    {
                        class: "panel panel-default"  
                    }).appendTo(wrapper);
                    
                    // Creating Panel Heading
                    var heading = $("<div>",
                    {
                        "data-toggle": "collapse",
                        "data-parent": "#" + element.title,
                        "data-target": "#" + this.id + i,   
                        class: "panel-heading"  
                    }).appendTo(panel);                
                    
                    // Creating Title
                    var title = $("<h4>",
                    {
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
                        createLinkRow("URL", this.url[i]).appendTo(panelbody);
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
        
        function addRow() {
            return $("<div class=\"row\"/>");
        }
        function addColumn(element) {
              return $("<div class=\"col-sm-4 text-left dashboardLinks\"><h2>" + element.title + "</h2></div>");
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
                    "<div class=\"col-sm-6\">" +
                    "<input type=\"password\" class=\"form-control\" id=\"" + labelId + "\" value=\"" + data + "\" />" +
                    "</div>" +
                    "<div class=\"col-sm-2\"><button type=\"submit\" class=\"btn btn-info\">Display</button></div>" + 
                    "</div>");
        };
        
        function createLinkRow(label, data) {
            var labelId = label.toLowerCase();
            return $("<div class=\"form-group row\">" +
                    "<label for=\"" + labelId + "\" class=\"col-sm-2 form-control-label\">" + label + "</label>" +
                    "<div class=\"col-sm-10\">" +
                    "<a href=\"" + data + "\" target=\"self\">" + data + "</a>" + 
                    "</div>" +
                    // Todo: "<div class=\"col-sm-2\"><button type=\"submit\" class=\"btn btn-primary\">Select Link</button></div>" + 
                    "</div>");
                    
                    // Todo: https://clipboardjs.com/
        };
        
        function lookup (array, prop, value) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] && array[i][prop] === value) return array[i];
            }

            return null;
        };
    }( window.dashboardLinks = window.dashboardLinks || {}, jQuery, dashboardConfig ));

    try { 
        dashboardLinks.init(".dashboard-container");
    } catch( e ) { 
        console.log( e.message ); 
    };
}