# Dashboard - Your daily credential library
Simple tool for storing your most common urls, usernames and passwords. It's not meant for secure password storing.

## Installation
* Download source code.
* Create a config.js file in root folder:
```
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
  ```
* Open index.html in browser
