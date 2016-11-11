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
           "./htdocs/css/cs.css": "./htdocs/less/db.less"
         }
      }
    },
    watch: {
      css: {
        files: "htdocs/less/*.less",
        tasks: ["less"]
      }
    }
});

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task(s).
  grunt.registerTask("default", ["less", "watch"]);

};