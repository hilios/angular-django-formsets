// Karma configuration
// Generated on Fri Jan 31 2014 23:18:09 GMT-0200 (BRST)

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '..',
    // frameworks to use
    frameworks: [
      'mocha',
      'chai',
      'sinon-chai'
    ],
    // list of files / patterns to load in the browser
    files: [
      'test/lib/jquery/jquery.js',
      'test/lib/angular/angular.js',
      'test/lib/angular-mocks/angular-mocks.js',
      'test/mocha.conf.js',
      'djangoFormsets/**/module.js',
      'djangoFormsets/**/*.js',
      'test/unit/**/*.spec.js'
    ],
    // list of files to exclude
    exclude: [
      '**/*.min.js',
      '**/karma.conf.js'
    ],
    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots', 'coverage'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,
    // Setup plugins that karma need to include
    plugins: [
      'karma-mocha',
      'karma-chai-plugins',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ],
    // Plugins configurations
    preprocessors: {
      'djangoFormsets/**/*.js': 'coverage'
    },
    // Instanbul reporter configuration
    coverageReporter: {
      type: 'text'
    }
  });
};
