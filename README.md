# Dashboard
Create a config.js file in root folder:
var dashboardConfig = {
    testDiv: {
        title: "Test",
        credentials: [
            {
                id: "websiteId",
                app: "My Website",
                url: ["http://example.com"],
                username: "username",
                password: "password"
            }
        ]
}

Map it against a div in index.html:
<div class="col-sm-4 text-left menu" data-config-environment="testDiv"></div>





[![Slack](https://bootstrap-slack.herokuapp.com/badge.svg)](https://bootstrap-slack.herokuapp.com)
![Bower version](https://img.shields.io/bower/v/bootstrap.svg)

## Copyright and license
Code released under [the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE). Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).
