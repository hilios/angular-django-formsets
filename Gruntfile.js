module.exports = function(grunt) {
  'use strict';
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    global: {
      src: ['djangoFormsets/**/module.js', 'djangoFormsets/**/*.js'],
      bin: 'angularformsets/static/<%= pkg.main %>'
    },
    uglify: {
      dev: {
        files: {
          '<%= global.bin %>': '<%= global.src %>'
        },
        options: {
          beautify: true,
          compress: false,
          mangle: false,
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
        configFile: 'tests/libs/karma.conf.js',
        background: false,
        autoWatch: false,
        singleRun: true
      }
    }
  });
  // Register NPM tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  // My custom alias
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['build', 'karma:unit']);
  grunt.registerTask('default', ['build']);
}