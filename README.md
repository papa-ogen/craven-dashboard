# Dashboard - Your daily credential library
Simple tool for storing your most common urls, usernames and passwords. It's **not** meant for secure password storing but a help tool for people using a lot of different URLs and credentials.

## Demo
Go to http://db.craven-studio.com/demo.html to try it out!

## Installation
* Download source code.
* Create a config.js file in root folder:
```javascript
var dashboardConfig = {
  dblinks: [{
    title: "Development",
    expanded: true,
    credentials: [{
      id: "github",
      name: "Github",
      descr: "GitHub is a web-based Git repository hosting service.",
      url: ["https://github.com/papa-ogen/cravenDashBoard"],
      username: "username",
      password: "password"
    },
    {
      id: "styleguide",
      name: "Style Guides",
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
      name: "Slack",
      url: ["https://slack.com"],
      username: "username",
      password: "password"
    }]
  },
  {
    title: "Social",
    //col: "col1", // Move linklist to specific column col1 or col2 
    credentials: [{
      id: "facebook",
      name: "Facebook",
      url: ["https://facebook.com"],
      username: "username",
      password: "password"
    },
    {
      id: "instagram",
      name: "Instagram",
      url: ["https://instagram.com"],
      username: "username",
      password: "password"
    }]
  },
  {
    title: "Personal",
    expanded: true,
    credentials: [{
      id: "favs",
      name: "Favourites",
      url: ["http://www.hongkiat.com", "https://css-tricks.com/", "http://9gag.com/"]
    }]
  }  ],
  dbcountdown: {
    reportDay: 25
  }
}
  ```
* Open index.html in browser

## Tasklist
Is using local storage. **If your clear browser cache your entries will be deleted.**

## Coundown
If property exist.

Set last day you need to submit time sheet. cDB will try to remind you with a counter and if on the same day, an alert is shown.
