/* **********************
    * Code from: http://bootsnipp.com/snippets/featured/todo-example - credit to http://bootsnipp.com/rgbskills
    * Added code for local storage
    
    Todo: 
    * Bug if more than one item has same name (Add id)
    * Don't rewrite entire DOM on add/delete/check
    * Add timestamp on added item
********************** */

(function( dashboardTodo, $, config, undefined ) { 
    "use strict"
    
    var HasLocalStorage = typeof(Storage) !== "undefined";
    var localStorageId = "dashboardTodo";
    var taskItem = function(data) {
      this.id = data.id;
      this.created = data.created;
      this.name = data.name;
      this.checked = data.checked ? true : false;
    };
    var taskItems = [];
    var addTaskElement = $("#addTask");
    var taskListElement = $(".dashboard-tasks");
    var taskListCompleteElement = $(".dashboard-completed-tasks");
    
    function addItemOnClick(e) {
        e.preventDefault;
        
        if (e.which == 13) {
            if($(this).val() != '') {
                var name = $(this).val();

                // Update local storage
                var item = new taskItem({
                    id: guid(),
                    created: Date.now(),
                    name: name, 
                    checked: false
                });
                taskItems.unshift(item);
                addTodoItem(item.id, item.name); 
                saveData();
                
                // Reset input field
                addTaskElement.val('');     
            } else {
                // some validation
            }
        }
    };  
    
    //create task
    function addTodoItem(id, name) {
        var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" id=' + id + ' />'+ name +'</label></div></li>';
        taskListElement.prepend(markup);
    };
    
    function createTodoItem(id, name) {
        var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" id=' + id + ' />'+ name +'</label></div></li>';
        taskListElement.append(markup);
    };
    
    function createCompletedItem(id, name) {
        var markup = ' <li>' + name +'<button class="remove-item btn btn-default btn-xs pull-right" id=' + id + '><span class="glyphicon glyphicon-remove"></span></button></li>';
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
        taskListElement.html("");
        taskListCompleteElement.html("");
        listTasks();        
    };
    
    function listTasks() {
        for(var i=0; i<taskItems.length; i++)
        {
            if(!taskItems[i].checked) {
                createTodoItem(taskItems[i].id, taskItems[i].name);
            } else {
                createCompletedItem(taskItems[i].id, taskItems[i].name);
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
    };
    
    function completeItemOnClick() {
        if($(this).prop('checked')) {
            var name = $(this).parent("label").text();
            completeItem(name);
            taskListElement.html("");
            taskListCompleteElement.html("");
            listTasks();
            saveData();
        }
    };
    
    function clearLocalStorage() {
        localStorage.clear();
    };
    
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return "id" + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    dashboardTodo.init = function (container) {
        var container = $(container);
        
        if(HasLocalStorage) {
            var data = loadData();
            taskItems = data ? data : [];
        }
        
        addTaskElement.on('keypress', addItemOnClick);
        console.log(taskItems);
        listTasks();

        //delete done task from "already done"
        taskListCompleteElement.on('click','.remove-item', deleteItemOnClick);
          
        // mark task as done
        taskListElement.on('change','li input[type="checkbox"]', completeItemOnClick);
    };
    
}( window.dashboardTodo = window.dashboardTodo || {}, jQuery, dashboardConfig ));

try { 
    dashboardTodo.init(".dashboard-todo");
} catch( e ) { 
    console.log( e.message ); 
};