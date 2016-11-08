(function () {
    "use strict";

    var HasLocalStorage = Storage !== undefined;
    var localStorageId = "dashboardTodo";

    if (HasLocalStorage) {
        var todoList = document.getElementById("db-todo");
        var completedList = document.getElementById("db-complete");
        var addTaskElement = document.getElementById("db-addTask");
        var data = loadData();
        var tasks = data || [];

        sortTasks(tasks);

        tasks.forEach(listTasks);

        addTaskElement.addEventListener("keypress", addItemOnClick);

    } else {
        console.log("Your browser must support local storage in order to use this feature.");
    }

    function addItemOnClick(e) {
        e.preventDefault;

        if (e.which === 13 && e.target.value.length > 0) {

            var item = {
                id: guid(),
                created: Date.now(),
                name: e.target.value,
                complete: false,
                completed: {}
            };

            tasks.unshift(item);

            addTodoItem(item);

            saveData();

            e.target.value = "";
        }
    }

    function saveData() { localStorage.setItem(localStorageId, JSON.stringify(tasks)); }
    
    function loadData() {
        var retrievedObject = localStorage.getItem(localStorageId);
        return JSON.parse(retrievedObject);
    }

    function clearLocalStorage() {
        localStorage.clear();
    }

    function formatDate(time) {
        var today = new Date().setHours(0, 0, 0, 0);
        var date = new Date(time);
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();

        if(dd<10) { dd="0"+dd; }
        if(mm<10) { mm="0"+mm; }

        var dateStr = yyyy + "-" + mm + "-" + dd;

        if(date.setHours(0, 0, 0, 0) === today) dateStr = "today";

        return dateStr;
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        return "id" + s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    }

    function sortTasks (objects) {
        objects.sort(function(a, b) { return parseFloat(a.created) - parseFloat(b.created); });
    }

    function listTasks (task) {
        if(!task.complete) {

            addTodoItem(task);

        } else {

            addCompletedItem(task);

        }
    }

    function addTodoItem(item) {
        var li = _createElement("li", {
            classList: "db-task",
            text: item.name,
            attr: [ ["title", "Complete Item\nAdded: " + formatDate(item.created) ], ["id", item.id] ]
        }, todoList, true);
        var itemCreated = _createElement("span", {text: "["+formatDate(item.created)+"]", classList: "db-date"}, li);

        li.addEventListener("click", completeItemOnClick);
    }

    function addCompletedItem(item) {
        var li = _createElement("li", {}, completedList, true);
        var span = _createElement("span", { text: item.name, attr: [ [ "title", "Undo" ] ] }, li);
        var btn = _createElement("button", {
            text: "x",
            classList: "db-btn-delete db-right",
            attr: [ [ "title", "Delete" ], [ "id", item.id ] ]
        }, li);

        btn.addEventListener("click", deleteItemOnClick);
        span.addEventListener("click", unCompleteItemOnClick);
    }

    function completeItemOnClick(e) {
        e.preventDefault;

        var id = e.target.id;
        var item = completeItem(id);

        saveData();

        todoList.removeChild(e.target);
        addCompletedItem(item);
    }

    function completeItem(id) {
        var task = tasks.filter(function (task) {
            return task.id === id;
        });

        task[0].complete = true;
        task[0].completed = Date.now();

        return task[0];
    }

    function unCompleteItemOnClick(e) {
        e.preventDefault;

        var id = e.target.nextSibling.id;
        var item = inCompleteItem(id);

        saveData();

        addTodoItem(item);

        completedList.removeChild(e.target.parentNode);
    }

    function inCompleteItem(id) {
        var task = tasks.filter(function (task) {
            return task.id === id;
        });

        task[0].complete = false;

        return task[0];
    }    

    function deleteItemOnClick(e) {
        e.preventDefault;

        var id = e.target.id;

        completedList.removeChild(e.target.parentNode);

        deleteItem(id);

        saveData();
    }

    function deleteItem(id) {
        var tempTasks = tasks.filter(function (task) {
            return task.id !== id;
        });

        tasks = tempTasks;
    }

    /*
        Create a HTML Object dynamically
        Example:
        var obj = {
            classList: "class1 class2",
            attr: [ ["id", "123"], ["name", "test"] ]
        };
        var e = createElement("div", obj, li);
    */
    function _createElement(element, obj, parent, insertBefore) {
        var e = document.createElement(element);

        if(obj.text) {
            var t = document.createTextNode(obj.text);
            e.appendChild(t);
        }

        if(obj.classList) {
            e.classList = obj.classList;
        }

        if(obj.attr) {
            obj.attr.forEach(function (attr) {
                e.setAttribute(attr[0], attr[1]);
            });
        }

        if(insertBefore) {
            parent.insertBefore(e, parent.children[0]);
        } else {
            parent.appendChild(e);
        }

        return e;
    }

})();