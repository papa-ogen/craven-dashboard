# Dashboard
Create a config.js file in root folder:
<pre>
var dashboardConfig = [
    {
        title: "Environment1",
        credentials: [
            {
                id: "websiteId",
                app: "My Website",
                url: ["http://example.com"],
                username: "username",
                password: "password"
            }
        ]
    },
    {
        title: "Environment2",
        credentials: [
            {
                id: "websiteId",
                app: "My Website",
                url: ["http://example.com"],
                username: "username",
                password: "password"
            },
            {
                id: "websiteId2",
                app: "My Website2",
                url: ["http://example2.com"],
                username: "username",
                password: "password"
            }            
        ]
    }    
]
</pre>
