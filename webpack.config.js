'use strict';

var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    plugins: [new WebpackNotifierPlugin],
    entry: './src/vue-countdown.vue',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vue-countdown.js',
        libraryTarget: 'umd',
        library: 'vue-countdown'
    },
    resolve: {
        extensions: ['.vue', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loaders: ['vue-loader', 'eslint-loader'],
                exclude: /node_modules/
            }
        ]
    }
};