
if(typeof dashboardConfig == 'undefined') {
    var exampleFormat = "<pre>var dashboardConfig = {\n" +
                        "\tepi: {\n" +
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
            "\t}\n" +
            "}" +
            "</pre>";
    $(".alert").html("<strong>Error!</strong> Please add a config.js file to the project." + exampleFormat).removeClass("hidden");
} else {

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
                    console.log("env: ", env.title)
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
                    "<div class=\"col-sm-2\"><button type=\"submit\" class=\"btn btn-primary\">Display</button></div>" + 
                    "</div>");
        };
        
        function createLinkRow(label, data) {
            var labelId = label.toLowerCase();
            return $("<div class=\"form-group row\">" +
                    "<label for=\"" + labelId + "\" class=\"col-sm-2 form-control-label\">" + label + "</label>" +
                    "<div class=\"col-sm-6\">" +
                    "<a href=\"" + data + "\" target=\"self\">" + data + "</a>" + 
                    "</div>" +
                    "<div class=\"col-sm-2\"><button type=\"submit\" class=\"btn btn-primary\">Select Link</button></div>" + 
                    "</div>");
                    
                    // https://clipboardjs.com/
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

    /* **********************
        Todo List
        
        * Code from: http://bootsnipp.com/snippets/featured/todo-example - credit to http://bootsnipp.com/rgbskills
        * Added code for local storage
        
    ********************** */

    (function( todolist, $, config, undefined ) { 
        "use strict"
        
        var HASLOCALSTORAGE = typeof(Storage) !== "undefined";
        
        // all done btn
        $("#checkAll").click(function(){
            AllDone();
        });

        //create todo
        $('.add-todo').on('keypress',function (e) {
            e.preventDefault
            if (e.which == 13) {
                if($(this).val() != ''){
                var todo = $(this).val();
                    createTodo(todo); 
                    countTodos();
                }else{
                    // some validation
                }
            }
        });
        
        // mark task as done
        $('.todolist').on('change','#sortable li input[type="checkbox"]',function(){
            if($(this).prop('checked')){
                var doneItem = $(this).parent().parent().find('label').text();
                $(this).parent().parent().parent().addClass('remove');
                done(doneItem);
                countTodos();
            }
        });

        //delete done task from "already done"
        $('.todolist').on('click','.remove-item',function(){
            removeItem(this);
        });

        // count tasks
        function countTodos(){
            var count = $("#sortable li").length;
            $('.count-todos').html(count);
        };

        //create task
        function createTodo(text){
            var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
            $('#sortable').append(markup);
            $('.add-todo').val('');
        };

        //mark task as done
        function done(doneItem){
            var done = doneItem;
            var markup = '<li>'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
            $('#done-items').append(markup);
            $('.remove').remove();
        };

        //mark all tasks as done
        function AllDone(){
            var myArray = [];

            $('#sortable li').each( function() {
                myArray.push($(this).text());   
            });
            
            // add to done
            for (var i = 0; i < myArray.length; i++) {
                $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
            }
            
            // myArray
            $('#sortable li').remove();
            countTodos();
        };

        //remove done task from list
        function removeItem(element){
            $(element).parent().remove();
        };
        
        //create json array of list items
        function createJson(data) {
            
        };
        
        function saveTodoList(data) {
            
        };
        
        function loadTodoList(data) {
            
        };

        todolist.init = function () {
            countTodos();
            console.log("Has local storage: ", HASLOCALSTORAGE);
        };
        
    }( window.todolist = window.todolist || {}, jQuery, dashboardConfig ));

    try { 
        todolist.init();
    } catch( e ) { 
        console.log( e.message ); 
    };
}