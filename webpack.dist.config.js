var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

var folders = {
    APP: path.resolve(__dirname, '../app'),
    BUILD: path.resolve(__dirname, '../build'),
    BOWER: path.resolve(__dirname, '../bower_components'),
    NPM: path.resolve(__dirname, '../node_modules')
};

var config = {
    entry: {
        app: ["./js/app.js"]
    },
    resolve: {
        alias: {}
    },
    debug: true,
    output: {
        publicPath: './',
        path: __dirname + '/build',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 2 version',
                    'sass?' + ['outputStyle=nested'].join('&')
                ]
            },
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.(jpg|png|gif)$/, loader: 'file' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.AggressiveMergingPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        dead_code: true,
                        drop_console: true,
                        drop_debugger: true
                    }
                }),
        new webpack.ProvidePlugin({
            'es6-promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        //new webpack.optimize.CommonsChunkPlugin('app', null, false),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/vertx/),
        new ExtractTextPlugin('styles.[hash].css', { allChunks: true }),
        new HtmlWebpackPlugin({ template: path.resolve('./', 'index.html') })
    ]
};

module.exports = config;
