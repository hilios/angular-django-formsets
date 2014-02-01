module.exports = function(grunt) {
  'use strict';
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    global: {
      src: ['djangoFormsets/**/module.js', 'djangoFormsets/**/*.js'],
      bin: 'angularformsets/static/<%= pkg.name %>',
      license: grunt.file.read('LICENSE').split('\n').splice(3).join('\n'),
      banner: '/*!\n' +
        ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * <%= global.license.replace(/\\n/gm, "\\n * ") %>\n' +
        ' */\n',
    },
    uglify: {
      options: {
        banner: '<%= global.banner %>'
      },
      dev: {
        files: {'<%= global.bin %>.js': '<%= global.src %>'},
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: false
        }
      },
      min: {
        files: {'<%= global.bin %>.min.js': '<%= global.src %>'},
        options: {
          report: 'min',
          sourceMap: '<%= global.bin %>.map',
          preserveComments: false
        }
      }
    },
    watch: {
      dev: {
        files: ['<%= global.src %>'],
        tasks: ['build']
      }
    },
    karma: {
      unit: {
        configFile: 'tests/config/karma.conf.js',
        background: false,
        autoWatch: false,
        singleRun: true
      }
    },
    jsonlint: {
      all: {
        src: "*.json"
      }
    }
  });
  // Register NPM tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jsonlint');
  // My custom alias
  grunt.registerTask('build', ['jsonlint', 'uglify']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['build']);
}
