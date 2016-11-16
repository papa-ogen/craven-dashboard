if (typeof dashboardConfig === "undefined") {

    var dbApp = document.getElementById("db-app");
    dbApp.innerHTML = '<div><strong>Error!</strong> Please add a <strong>config.js</strong> file to the project. <br /><br />' +
                      'Go to <a href="https://github.com/papa-ogen/cravenDashBoard/blob/master/README.md" target="self">DashBoard on GitHub</a> for more information and correct syntax.</div>';
    dbApp.className += " db-error";

} else {

    (function (config) {
        "use strict";

        var c = document.getElementById("db-links-container");
        var df = document.createDocumentFragment();
        var id = "toggle-";
        var linkCount = 0;
        var credentialCount = 0;
        var cols = {
            col1: _createElement ("div", { classList: "size-1of2" }, df),
            col2: _createElement ("div", { classList: "size-1of2" }, df) 
        }

        config.dblinks.sort(sortTitle);

        config.dblinks.forEach(addMarkup);

        c.appendChild(df);

        function sortTitle (a, b) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        }

        function sortLinks (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        }

        function addMarkup (element, index) {
            var mainCol = index % 2 ? cols.col2 : cols.col1;
            var col = _createElement ("div", { classList: "size-1of1 db-links-collection" }, element.col !== undefined ? cols[element.col] : mainCol);
            var subCol = _createElement ("div", { classList: "db-grid-content" }, col);
            var header = _createElement ("header", { classList: "db-links-header " + setHeaderColor(index) }, subCol);
            var title = _createElement ("h2", { text: element.title, classList: "db-sub-header" }, header);
            var linkList = _createElement ("ul", { classList: "db-links" }, subCol);

            // Todo: Implement in V3
            //var sortBy = element.sortBy !== undefined ? sortBy : "ASC";

            element.credentials.sort(sortLinks);

            for(var i=0; i < element.credentials.length; i++) {
                var li = _createElement ("li", {}, linkList);
                var label = _createElement ("label", { attr: [ [ "for", id+linkCount ] ] }, li);
                var h4 = _createElement ("h4", { text: element.credentials[i].name }, label);
                var expanded = element.expanded !== undefined && element.expanded || false;
                var checkbox = _createElement ("input", { classList: "toggle", attr: [ [ "type", "checkbox", expanded ], [ "id", id+linkCount ] ] }, li);
                var details = _createElement ("div", { classList: "db-details" }, li);
                var descr = _createElement ("summary", { text: element.credentials[i].descr, classList: "db-descr" }, details);

                addLinks(details, element.credentials[i]);

                linkCount++;
            }
        }

        function addLinks (parent, credentials) {
            var li, label, ahref, input, url, username, password;
            var linkList = _createElement("ul", { classList: "db-list size-1of1" }, parent);

            if(credentials.url !== undefined) {
                li = _createElement("li", {}, linkList);
                label = _createElement("label", { text: "URL", classList: "size-1of5" }, li);

                if(credentials.url.length === 1) {
                    url = credentials.url[0];

                    if(url.length > 0) {
                        ahref = _createElement("a", { text: url, attr: [ [ "href", url ], [ "target", "self" ] ] }, li);
                    }
                } else {
                    var numberedLinkList = _createElement("dl", { classList: "db-numbered-list size-2of3" }, li);

                    for(var i=0; i < credentials.url.length; i++) {
                        url = credentials.url[i];

                        if(url.length > 0) {
                            li = _createElement("dt", {}, numberedLinkList);
                            ahref = _createElement("a", { 
                                text: url, 
                                classList: url.length > 55 ? "db-text-small" : "", 
                                attr: [ [ "href", url ], [ "target", "self" ] ] }, li);
                        }
                    }
                }
            }

            if(credentials.username !== undefined && credentials.username)  {
                username = credentials.username;

                li = _createElement ("li", {}, linkList);

                label = _createElement ("label", {
                    text: "Username",
                    classList: "size-1of5",
                    attr: [ [ "for", "name"+credentialCount ] ]
                }, li);

                input = _createElement ("input", {
                    classList: "size-2of3",
                    attr: [ [ "type", "text" ], [ "id", "name"+credentialCount ], [ "value", username ] ]
                }, li);

                input.addEventListener("focus", selectIinputValue);

                credentialCount++;
            }

            if(credentials.password !== undefined && credentials.password) {
                password = credentials.password;

                li = _createElement ("li", {}, linkList);

                label = _createElement ("label", {
                    text: "Password",
                    classList: "size-1of5",
                    attr: [ [ "for", "name"+credentialCount ] ]
                }, li);

                input = _createElement ("input", {
                    classList: "size-2of3",
                    attr: [ [ "type", "password" ], [ "id", "name"+credentialCount ], [ "value", password ] ]
                }, li);

                input.addEventListener("focus", togglePassword);
                input.addEventListener("blur", togglePassword);

                credentialCount++;
            }
        }

        function selectIinputValue(e) {
            e.preventDefault;

            var text = e.target.value;
            e.target.select();
        }

        function togglePassword(e) {
            var input = e.target;

            input.type = input.type === "text" ? "password" : "text";

            if(e.type === "focus") input.select();
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
        function _createElement (element, obj, parent, insertBefore) {
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

                    if(attr[0] === "type" && attr[1] === "checkbox") {
                        e.checked = attr[2];
                    }
                    
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

        function setHeaderColor(index) {

            switch(index) {
                case 0:
                default:
                    return "db-header-color-blue";
                case 1:
                case 4:
                    return "db-header-color-green";
                case 2:
                case 5:
                    return "db-header-color-yellow";   
                case 3:
                case 6:
                    return "db-header-color-red";                                       
            }
        }

    })(dashboardConfig);
};(function () {
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
            classList: "db-btn-delete right",
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
        var r = confirm("Are you sure?");

        if (r == true) {
            completedList.removeChild(e.target.parentNode);

            deleteItem(id);

            saveData();
        }
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

})();;if (typeof dashboardConfig === "undefined") {

    var dbApp = document.getElementById("db-app");
    dbApp.innerHTML = '<div><strong>Error!</strong> Please add a <strong>config.js</strong> file to the project. <br /><br />' +
                      'Go to <a href="https://github.com/papa-ogen/cravenDashBoard/blob/master/README.md" target="self">DashBoard on GitHub</a> for more information and correct syntax.</div>';
    dbApp.className += " db-error";

} else {

    (function (config) {
        "use strict";

        if(config.dbcountdown === undefined) return;

        var countDownElement = document.querySelector(".db-countdown").getElementsByTagName('time')[0];
        var overlayElement = document.querySelector(".db-alert");
        var reportDay = config.dbcountdown.reportDay;
        var reportText = "";
        var d = new Date();
        var today = d.getDate();

        if(today === reportDay) {

            reportText = "Today!";
            overlayElement.classList += " db-active";

            overlayElement.addEventListener("click", function() {
                this.classList = "db-alert";
            });

        } else if (today+1 === reportDay) {
            reportText = "Towmorrow!";
        } else if (reportDay < today) {
            // if date has passed, calculate closest reportDay ahead.
            var daysInMonth = getDaysInMonth(d, d.getMonth());
            var daysLeft = (daysInMonth - today) + reportDay;

            reportText = daysLeft + " days left";
        } else {
            reportText = reportDay - today + " days left";
        }

        countDownElement.innerHTML = reportText;

        function getDaysInMonth(d, month) {
            var m = [31, (isLeapYear(d.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return m[month];
        }

        function isLeapYear(year)
        {
            return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        }

    })(dashboardConfig);
}