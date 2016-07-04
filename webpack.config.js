var webpack = require('webpack');
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
        app: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:3000',
            "./js/app.js"
        ]
    },
    debug: true,
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        alias: {
        }
    },
    stats: {
        colors: true,
        reasons: true,
    },
    output: {
        path: __dirname + '/build',
        publicPath: '/',
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
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.(jpg|png|gif)$/, loader: 'file' },
            { test: /\.(scss)$/, loader: 'sass' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.ProvidePlugin({
            'es6-promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        //new webpack.optimize.CommonsChunkPlugin('app', null, false),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./', 'index.html'),
            webpackDevServer: '/webpack-dev-server.js'
        })
    ]
};

module.exports = config;
