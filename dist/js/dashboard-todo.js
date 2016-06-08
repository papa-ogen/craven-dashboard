/* **********************
    Todo List
    
    * Code from: http://bootsnipp.com/snippets/featured/todo-example - credit to http://bootsnipp.com/rgbskills
    * Added code for local storage
********************** */

(function( dashboardTodo, $, config, undefined ) { 
    "use strict"
    
    var HasLocalStorage = typeof(Storage) !== "undefined";
    var localStorageId = "dashboardTodo";
    var taskItem = function(name, checked) {
      this.name = name;
      this.checked = checked ? true : false;
    };
    var taskItems = [];
    var addTaskElement = $("#addTask");
    var taskListElement = $(".dashboard-tasks");
    var taskListCompleteElement = $(".dashboard-completed-tasks");
    
    function addItem(e) {
        e.preventDefault;
        
        if (e.which == 13) {
            if($(this).val() != '') {
            var todo = $(this).val();
                addTodoItem(todo); 

                // Update local storage
                taskItems.unshift(new taskItem(todo, false));
                saveData();
                // Reset input field
                addTaskElement.val('');     
            } else {
                // some validation
            }
        }
    };  
    
    //create task
    function addTodoItem(name) {
        var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ name +'</label></div></li>';
        taskListElement.prepend(markup);
    };
        
    function createTodoItem(name) {
        var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ name +'</label></div></li>';
        taskListElement.append(markup);
    };
    
    function createCompletedItem(name) {
        var markup = ' <li>' + name +'<button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></li>';
        taskListCompleteElement.append(markup);
    };    
    
    function saveData() {
        localStorage.setItem(localStorageId, JSON.stringify(taskItems));    
    };
    
    function loadData() {
        var retrievedObject = localStorage.getItem(localStorageId);
        return JSON.parse(retrievedObject);
    };
    
    function deleteItem(name) {
        var tasks = [];
        for(var i=0; i<taskItems.length; i++)
        {
            if(taskItems[i].name != name) {
                tasks.push(taskItems[i]);
            }
        }
        taskItems = tasks;
        saveData();
    };
    
    function deleteItemOnClick() {
        var name = $(this).parent("li").text();
        deleteItem(name);
        listTasks();        
    };
    
    function listTasks() {
        for(var i=0; i<taskItems.length; i++)
        {
            if(!taskItems[i].checked) {
                createTodoItem(taskItems[i].name);
            } else {
                createCompletedItem(taskItems[i].name);
            }
        } 
    };
    
    function completeItem(name) {
        for(var i=0; i<taskItems.length; i++)
        {
            if(taskItems[i].name == name) {
                taskItems[i].checked = true;
                return;
            }
        }         
    }
    
    function clearLocalStorage() {
        localStorage.clear();
    };

    dashboardTodo.init = function (container) {
        var container = $(container);
        
        if(HasLocalStorage) {
            var data = loadData();
            taskItems = data ? data : [];
        }
        
        addTaskElement.on('keypress', addItem);
        
        listTasks();

        //delete done task from "already done"
        taskListCompleteElement.on('click','.remove-item', deleteItemOnClick);
          
        // mark task as done
        taskListElement.on('change','li input[type="checkbox"]', function() {
            if($(this).prop('checked')) {
                var name = $(this).parent("label").text();
                completeItem(name);
                taskListElement.html("");
                taskListCompleteElement.html("");
                listTasks();
                saveData();
            }
        });
    };
    
}( window.dashboardTodo = window.dashboardTodo || {}, jQuery, dashboardConfig ));

try { 
    dashboardTodo.init(".dashboard-todo");
} catch( e ) { 
    console.log( e.message ); 
};