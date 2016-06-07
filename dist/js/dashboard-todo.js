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
        // Todo: saveTodoList(data);
    };
    
    function saveTodoList(data) {
    localStorage.setItem('dbtodolist', JSON.stringify(data));    
    };
    
    function loadTodoList() {
        var retrievedObject = localStorage.getItem('dbtodolist');
        return JSON.parse(retrievedObject);
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