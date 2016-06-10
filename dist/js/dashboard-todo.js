/* **********************
    Todo: 
    * Bug if more than one item has same name (Add id)
    * Don't rewrite entire DOM on add/delete/check
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
                addTodoItem(item); 
                saveData();
                
                // Reset input field
                addTaskElement.val('');     
            } else {
                // some validation
            }
        }
    };  
    
    //create task
    function addTodoItem(item) {
        var markup = '<li class="ui-state-default" title="' + formatDate(item.created) + '"><div class="checkbox"><label><input type="checkbox" value="" id=' + item.id + ' />'+ item.name +'</label></div></li>';
        taskListElement.prepend(markup);
    };
    
    function createCompletedItem(item) {
        var markup = ' <li title="' + formatDate(item.created) + '">' + item.name +'<button class="btn btn-danger btn-xs pull-right" id=' + item.id + '><span class="glyphicon glyphicon-remove"></span></button></li>';
        taskListCompleteElement.prepend(markup);
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
                addTodoItem(taskItems[i]);
            } else {
                createCompletedItem(taskItems[i]);
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
    
    function sortItems(objects) {
        // Todo: 
        objects.sort(function(a, b) {
            return parseFloat(a.created) - parseFloat(b.created);
        });    
    };
    
    function formatDate(date) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        
        if(dd<10) { dd='0'+dd } 
        if(mm<10) { mm='0'+mm }
        
        return yyyy + "-" + mm + "-" + dd;
    };
    
    dashboardTodo.init = function (container) {
        var container = $(container);
        
        if(HasLocalStorage) {
            var data = loadData();
            taskItems = data ? data : [];
            sortItems(taskItems);
        }
        
        addTaskElement.on('keypress', addItemOnClick);
        
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