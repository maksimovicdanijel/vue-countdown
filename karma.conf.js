var webpackConfig = require('./webpack.config');
delete webpackConfig.entry;

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['spec', 'coverage'],
        // this is the entry file for all our tests.
        files: ['test/index.js'],
        // we will pass the entry file to webpack for bundling.
        preprocessors: {
            'test/index.js': ['webpack', 'sourcemap']
        },
        plugins: [
            // Launchers
            'karma-phantomjs-launcher',

            // Test Libraries
            'karma-jasmine',

            // Preprocessors
            'karma-webpack',
            'karma-sourcemap-loader',

            // Reporters
            'karma-spec-reporter',
            'karma-coverage'
        ],
        // use the webpack config
        webpack: webpackConfig,
        // avoid walls of useless text
        webpackMiddleware: {
            noInfo: true
        },
        singleRun: true,
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    });
};

