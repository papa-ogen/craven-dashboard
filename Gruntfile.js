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
         files: [
         {src: ["htdocs/less/db-grid.less", "htdocs/less/db-countdown.less", "htdocs/less/db.less"], dest: "dist/css/db.css"}
        ],
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: "dist/css",
          src: ["*.css", "!*.min.css"],
          dest: "dist/css",
          ext: ".min.css"
        }]
      }
    },    
    uglify: {
        my_target: {
          files: {
            "dist/js/db.min.js": ["htdocs/js/db-links.js", "htdocs/js/db-countdown.js", "htdocs/js/db-todo.js"]
          }
        }
    },
    concat: {
        options: {
          separator: ";",
        },
        dist: {
          src: ["htdocs/js/db-links.js", "htdocs/js/db-todo.js", "htdocs/js/db-countdown.js"],
          dest: "dist/js/db.js",
        },
    },    
    watch: {
      css: {
        files: "htdocs/less/*.less",
        tasks: ["less"]
      },
      minify: {
        files: "dist/css/*.css",
        tasks: ["cssmin"]
      },
      js: {
        files: "htdocs/js/*.js",
        tasks: ["uglify"]
      },
      concat: {
        files: "htdocs/js/*.js",
        tasks: ["concat"]
      }
    }
});

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-concat");  

  // Default task(s).
  grunt.registerTask("default", ["less", "watch", "uglify", "cssmin", "concat"]);

};