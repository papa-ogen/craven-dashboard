/* **********************
    Todo: 
    * Don't rewrite entire DOM on add/delete/check, suggestion: add element to object.
********************** */

(function( dashboardTodo, $, config, undefined ) { 
    "use strict"
    
    var HasLocalStorage = typeof(Storage) !== "undefined";
    var localStorageId = "dashboardTodo";
    function TaskItem(data) {
      this.id = data.id;
      this.created = data.created;
      this.name = data.name;
      this.checked = data.checked ? true : false;
    };

    TaskItem.prototype.someMethod = function () {};

    var taskItems = [];
    var addTaskElement = $("#addTask");
    var taskListElement = $(".dashboard-tasks");
    var taskListCompleteElement = $(".dashboard-completed-tasks");

    function addItemOnClick(e) {
        e.preventDefault;
        
        if (e.which == 13) {
            if($(this).val() != "") {
                var name = $(this).val();

                // Update local storage
                var item = new TaskItem({
                    id: guid(),
                    created: Date.now(),
                    name: name, 
                    checked: false
                });
                taskItems.unshift(item);
                addTodoItem(item); 
                saveData();
                
                addTaskElement.val("");     
                $(this).parent("div").removeClass("has-error");
            } else {
                $(this).parent("div").addClass("has-error");
            }
        }
    };  
    
    //create task
    function addTodoItem(item) {
        var markup = $('<li class="ui-state-default" title="' + formatDate(item.created) + '"><div class="checkbox"><label><input type="checkbox" value="" id=' + item.id + ' />'+ item.name +'</label></div></li>');
        taskListElement.prepend(markup);
        markup.hide();
        markup.fadeIn('slow');
    };
    
    function createCompletedItem(item) {
        var markup = ' <li title="' + formatDate(item.created) + '">' + item.name +'<button class="remove-item btn btn-danger btn-xs pull-right" id=' + item.id + '><span class="glyphicon glyphicon-remove"></span></button></li>';
        taskListCompleteElement.prepend(markup);
    };    
    
    function saveData() {
        localStorage.setItem(localStorageId, JSON.stringify(taskItems));    
    };
    
    function loadData() {
        var retrievedObject = localStorage.getItem(localStorageId);
        return JSON.parse(retrievedObject);
    };
    
    function deleteItem(id) {
        var tasks = [];
        for(var i=0; i<taskItems.length; i++)
        {
            if(taskItems[i].id != id) {
                tasks.push(taskItems[i]);
            }
        }
        taskItems = tasks;
        saveData();
    };
    
    function deleteItemOnClick() {
        var id = $(this).attr("id");
        deleteItem(id);
        taskListElement.html("");
        taskListCompleteElement.html("");
        listTasks();        
    };
    
    function listTasks() {
        var time = 0;
        var taskitem = "";
        for(var i=0; i<taskItems.length; i++)
        {
            if(!taskItems[i].checked) {
               addTodoItem(taskItems[i]); 
            } else {
                createCompletedItem(taskItems[i]);
            }
        } 
    };
    
    function completeItem(id) {
        for(var i=0; i<taskItems.length; i++)
        {
            if(taskItems[i].id == id) {
                taskItems[i].checked = true;
                return;
            }
        }         
    };
    
    function completeItemOnClick() {
        if($(this).prop('checked')) {
            var id = $(this).attr("id");
            completeItem(id);
            taskListElement.html("");
            taskListCompleteElement.html("");
            listTasks();
            saveData();
        }
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
    
    function clearLocalStorage() {
        localStorage.clear();
    };
        
    dashboardTodo.init = function (container) {
        var container = $(container);
//clearLocalStorage();
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