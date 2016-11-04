if (typeof dashboardConfig === "undefined") {

    var exampleFormat = "<pre>var dashboardConfig = [\n" +
                        "\t{\n" +
        "\t\ttitle: \"Developer Links\",\n" +
        "\t\tcredentials: [\n" +
            "\t\t{\n" +
                "\t\t\tid: \"teamcity\",\n" +
                "\t\t\tapp: \"Team City\",\n" +
                "\t\t\turl: [\"https://www.jetbrains.com/teamcity/\"],\n" +
                "\t\t\tusername: \"username\",\n" +
                "\t\t\tpassword: \"password\"\n" +
            "\t\t},\n" +
            "\t\t{\n" +
                "\t\t\tid: \"octopus\",\n" +
                "\t\t\tapp: \"Octopus\",\n" +
                "\t\t\turl: [\"https://octopus.com/\"],\n" +
                "\t\t\tusername: \"username\",\n" +
                "\t\t\tpassword: \"password\"\n" +
            "\t\t}\n" +
            "\t\t]\n" +
            "\t}\n" +
            "]" +
            "</pre>";
    var dbApp = document.getElementById("db-app");
    dbApp.innerHTML = "<div><strong>Error!</strong> Please add a <strong>config.js</strong> file to the project. <br /><br />Example: " + exampleFormat + "</div>";
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
            var col = createElement("div", "db-size-1of2 db-links-collection", "", c);
            var subCol = createElement("div", "db-grid-content", "", col);
            var header = createElement("header", "db-links-header db-header-color-blue", "", subCol);
            var title = createElement("h2", "", element.title, header);
            var linkList = createElement("ul", "db-links", "", subCol);

            for(var i=0; i < element.credentials.length; i++) {
                var li = createElement("li", "", "", linkList);
                var label = createElement("label", "", "", li, {type: "for", value: id+linkCount});
                var h4 = createElement("h4", "", element.credentials[i].app, label);
                var checkbox = createInput("checkbox", id+linkCount, "db-toggle", "", li);
                var details = createElement("div", "db-details", "", li);
                var links = createElement("ul", "", "", details);
                
                addLinks(links, element.credentials[i]);

                linkCount++;
            }

        };

        function addLinks (linkList, credentials) {
            var li, label, ahref, input;

            if(credentials.url !== undefined) {
                for(var i=0; i < credentials.url.length; i++) {
                    li = createElement("li", "", "", linkList);
                    label = createElement("label", "", "URL", li);
                    ahref = createElement("a", "", credentials.url[i], li, {type: "href", value: "#"});
                }
            }

            if(credentials.username !== undefined)  {
                li = createElement("li", "", "", linkList);
                label = createElement("label", "", "Username", li, {type: "for", value: "name"+credentialCount});
                input = createInput("text", "name"+credentialCount, "", credentials.username, li);
                credentialCount++;
            }

            if(credentials.password !== undefined) { 
                li = createElement("li", "", "", linkList);
                label = createElement("label", "", "Password", li, {type: "for", value: "name"+credentialCount});
                input = createInput("password", "name"+credentialCount, "", credentials.password, li);
                credentialCount++;
            }
        };

        function createElement (type, classList, text, appendTo, attribute = 0) {
            var e = document.createElement(type);
            // Todo: change to one object parameter, use switch to determine type of attr or classList
            if(text.length > 0) {
                var t = document.createTextNode(text);
                e.appendChild(t);
            } 

            if(attribute) {
                e.setAttribute(attribute.type, attribute.value);
            }

            if(classList.length > 0) {
                e.classList = classList;
            }

            appendTo.appendChild(e);

            return e;
        }

        function createInput (type, id, classList, value, appendTo) {
            // Todo: change to one object parameter, use switch to determine type of attr or classList
            var e = document.createElement("input");
            e.setAttribute("type", type);
            e.setAttribute("id", id);
            e.setAttribute("value", value);
            e.classList = classList;

            appendTo.appendChild(e);
        }

        // Todo: Add event receiver on focus text: http://stackoverflow.com/questions/480735/select-all-contents-of-textbox-when-it-receives-focus-javascript-or-jquery

    })(dashboardConfig);
}