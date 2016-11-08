# Dashboard - Your daily credential library
Simple tool for storing your most common urls, usernames and passwords. It's **not** meant for secure password storing.

## Installation
* Download source code.
* Create a config.js file in root folder:
```javascript
var dashboardConfig = [{
  title: "Development",
  expanded: true,
  credentials: [{
    id: "github",
    name: "Github",
    descr: "GitHub is a web-based Git repository hosting service.",
    url: ["http://example.com"],
    username: "username",
    password: "password"
  },
  {
    id: "styleguide",
    app: "Style Guides",
    url: ["https://google.github.io/styleguide/javascriptguide.xml", "https://google.github.io/styleguide/htmlcssguide.xml"]
  }]
},
{
  title: "Business",
  credentials: [{
    id: "trello",
    name: "Trello",
    url: ["https://trello.com"],
    username: "username",
    password: "password"
  },
  {
    id: "slack",
    app: "Slack",
    url: ["https://slack.com/"],
    username: "username",
    password: "password"
  }]
}]
  ```
* Open index.html in browser

## Tasklist
Is using local storage. **If your clear browser cache your entries will be deleted.**
