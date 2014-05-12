// Karma configuration
module.exports = function(config) {
  config.set({
    frameworks: [
      'mocha',
      'chai',
      'chai-jquery',
      'sinon-chai'
    ],
    files: [
      'test/lib/jquery/jquery.js',
      'test/lib/angular/angular.js',
      'test/lib/angular-mocks/angular-mocks.js',
      'ngDjangoFormset/**/module.js',
      'ngDjangoFormset/**/*.js',
      'test/helpers.js',
      'test/unit/**/*.spec.js'
    ],
    exclude: [
      'karma.conf.js'
    ],
    reporters: [
      'dots',
      'coverage'
    ],
    preprocessors: {
      'ngDjangoFormset/**/*.js': 'coverage'
    },
    coverageReporter: {
      type: 'text',
      dir: 'test/coverage'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ],
    singleRun: true
  });
};
