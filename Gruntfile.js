module.exports = function(grunt) {
  'use strict';
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),
    ngDjangoFormset: {
      src: ['djangoFormsets/**/module.js', 'djangoFormsets/**/*.js'],
      bin: 'angularformsets/static/<%= bower.name %>',
      license: grunt.file.read('LICENSE').split('\n').splice(3).join('\n'),
      banner: '/*!\n' +
        ' * <%= bower.title %> v<%= bower.version %>' +
        ' * <%= bower.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= bower.author %>\n' +
        ' * <%= ngDjangoFormset.license.replace(/\\n/gm, "\\n * ") %>\n' +
        ' */\n',
    },
    uglify: {
      options: {
        banner: '<%= ngDjangoFormset.banner %>'
      },
      dev: {
        files: {'<%= ngDjangoFormset.bin %>.js': '<%= ngDjangoFormset.src %>'},
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: false
        }
      },
      min: {
        files: {'<%= ngDjangoFormset.bin %>.min.js': '<%= ngDjangoFormset.src %>'},
        options: {
          report: 'min',
          sourceMap: '<%= ngDjangoFormset.bin %>.map',
          preserveComments: false
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true,
        singleRun: false
      },
      travis: {
        configFile: '<%= karma.unit.configFile %>',
        // autoWatch: false,
        // singleRun: true
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jsonlint');
  // My custom alias
  grunt.registerTask('build', ['jsonlint', 'uglify']);
  grunt.registerTask('test', ['karma:travis']);
  grunt.registerTask('default', ['karma:unit']);
}
