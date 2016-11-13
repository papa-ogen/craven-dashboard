module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
      less: {
        development: {
         options: {
           paths: ["./htdocs/less"]
         },
         files: {
           "./htdocs/css/db-main.css": "./htdocs/less/*.less"
         }
      }
    },
    uglify: {
        my_target: {
          files: {
            "dist/db.min.js": ["htdocs/js/db-links.js", "htdocs/js/db-countdown.js", "htdocs/js/db-todo.js"]
          }
        }
    },    
    watch: {
      css: {
        files: "htdocs/less/*.less",
        tasks: ["less"]
      },
      js: {
        files: "htdocs/js/*.js",
        tasks: ["uglify"]
      }
    }
});

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  grunt.registerTask("default", ["less", "watch", "less"]);

};