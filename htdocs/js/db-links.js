if (typeof dashboardConfig === "undefined") {

    var dbApp = document.getElementById("db-app");
    dbApp.innerHTML = "<div><strong>Error!</strong> Please add a <strong>config.js</strong> file to the project. <br /><br />" +
                      "Go to <a href=\"https://github.com/papa-ogen/DashBoard/blob/master/README.md\" target=\"self\">DashBoard on GitHub</a> for more information and correct syntax.</div>";
    dbApp.className += " db-error";

} else {

    (function (config) {
        "use strict";

        var c = document.getElementById("db-links-container");
        var id = "toggle-";
        var linkCount = 0;
        var credentialCount = 0;

        config.forEach(addMarkup);

        function addMarkup (element, index) {
            var col = _createElement ("div", { classList: "db-size-1of2 db-links-collection" }, c);
            var subCol = _createElement ("div", { classList: "db-grid-content" }, col);
            var header = _createElement ("header", { classList: "db-links-header db-header-color-blue" }, subCol);
            var title = _createElement ("h2", { text: element.title }, header);
            var linkList = _createElement ("ul", { classList: "db-links" }, subCol);

            for(var i=0; i < element.credentials.length; i++) {
                var li = _createElement ("li", {}, linkList);
                var label = _createElement ("label", { attr: [ [ "for", id+linkCount ] ] }, li);
                var h4 = _createElement ("h4", { text: element.credentials[i].app }, label);
                var checkbox = _createElement ("input", { classList: "db-toggle", attr: [ [ "type", "checkbox" ], [ "id", id+linkCount ] ] }, li);
                var details = _createElement ("div", { classList: "db-details" }, li);
                var links = _createElement("ul", {}, details);
                
                addLinks(links, element.credentials[i]);

                linkCount++;
            }

        };

        function addLinks (linkList, credentials) {
            var li, label, ahref, input, url, username, password;

            if(credentials.url !== undefined) {
                for(var i=0; i < credentials.url.length; i++) {
                    url = credentials.url[i];
                    username = credentials.username;
                    password = credentials.password;

                    if(url) {
                        li = _createElement("li", {}, linkList);
                        label = _createElement("label", { text: "URL" }, li);
                        ahref = _createElement("a", { text: url, attr: [ [ "href", url ], [ "target", "self" ] ] }, li);
                    }
                }
            }

            if(username !== undefined && username)  {

                li = _createElement ("li", {}, linkList);
                
                label = _createElement ("label", {
                    text: "Username",
                    attr: [ [ "for", "name"+credentialCount ] ]
                }, li);
                
                input = _createElement ("input", {
                    attr: [ [ "type", "text" ], [ "id", "name"+credentialCount ], [ "value", username ] ]
                }, li);                 
                
                credentialCount++;
            }

            if(password !== undefined && password) { 
                
                li = _createElement ("li", {}, linkList);
                
                label = _createElement ("label", {
                    text: "Password",
                    attr: [ [ "for", "name"+credentialCount ] ]
                }, li);

                input = _createElement ("input", {
                    attr: [ [ "type", "password" ], [ "id", "name"+credentialCount ], [ "value", password ] ]
                }, li); 

                credentialCount++;
            }
        };

        /*
            Create a HTML Object dynamically
            Example: 
            var obj = {
                classList: "class1 class2",
                attr: [ ["id", "123"], ["name", "test"] ]
            };
            var e = createElement("div", obj, li);
        */
        function _createElement (element, obj, appendTo) {
            var e = document.createElement(element);

            if(obj.text) {
                var t = document.createTextNode(obj.text);
                e.appendChild(t);
            } 

            if(obj.classList) {
                e.classList = obj.classList;
            }

            if(obj.attr) {
                for(var i = 0; i < obj.attr.length; i++) {
                    e.setAttribute(obj.attr[i][0], obj.attr[i][1]);
                }
            }

            appendTo.appendChild(e);

            return e;            
        };

        // Todo: Add event receiver on focus text: http://stackoverflow.com/questions/480735/select-all-contents-of-textbox-when-it-receives-focus-javascript-or-jquery

    })(dashboardConfig);
}