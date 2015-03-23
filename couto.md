.dev

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    webpack = require('webpack'),
    folders = {
        APP: path.resolve(__dirname, '../app'),
        BUILD: path.resolve(__dirname, '../build'),
        BOWER: path.resolve(__dirname, '../app/bower_components'),
        NPM: path.resolve(__dirname, '../node_modules')
    };

module.exports = {

    cache: true,

    debug: true,

    devtool: 'eval-source-map',

    context: folders.APP,

    entry: {
        main: [
            'webpack/hot/dev-server',
            './main.jsx'
        ]
    },

    output: {
        publicPath: '/',
        path: folders.BUILD,
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js',
    },

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        root: [folders.NPM, folders.BOWER],
        extensions: ['', '.js', '.jsx', '.scss'],
        modulesDirectory: ['node_modules', 'bower_components']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // Parse our index.html as a template and replace the src attribute on
        // script tags, to point to our generated file.
        new HtmlWebpackPlugin({
            template: path.resolve(folders.APP, 'index.html'),
            webpackDevServer: '/webpack-dev-server.js'
        }),
        // Teach webpack to read bower packages (it's usually smarter to use node_modules only)
        // but somethings are not officially on npm (e.g.: jQueryUI) an I dont like to have
        // frontend modules separated between package managers.
        // new webpack.ResolverPlugin(
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        // ),
        new webpack.ProvidePlugin({
            'React': 'react/addons'
        }),
        // Define a global enviroment variable
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(path.resolve(__dirname, '../package.js').version),
            'ENV': JSON.stringify('development'),
            'NODE_ENV': JSON.stringify('development'),
            'process.env' : {
                'NODE_ENV' : JSON.stringify('development')
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 2 version',
                    'sass?' + [
                        'includePaths[]=' + folders.BOWER,
                        'includePaths[]=' + path.resolve(folders.BOWER, 'fontawesome/scss/'),
                        'includePaths[]=' + path.resolve(folders.BOWER, 'fontawesome/fonts/'),
                        'includePaths[]=' + path.resolve(folders.BOWER, 'bourbon/app/assets/stylesheets'),
                        'includePaths[]=' + path.resolve(folders.BOWER, 'neat/app/assets/stylesheets'),
                        'outputStyle=nested'
                    ].join('&')
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules|bower_components/,
                loaders: [
                    'react-hot',
                    'babel?optional=runtime&experimental'
                ]
            },
            { test: /\.(json)$/, loader: 'json' },
            { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
            { test: /\.(jpg|png|gif)$/, loader: 'file' }
        ]
    },

    devServer: {
        inline: true,
        hot: true,
        quiet: false,
        noInfo: false,
        lazy: false,
        historyApiFallback: true
    }
};

// package

{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "postinstall": "bower install",
    "clean": "rm -r build/*",
    "start": "npm run serve:dev",
    "serve:dev": "webpack-dev-server --config config/webpack.dev.js",
    "build:dev": "webpack --config config/webpack.dev.js",
    "build:dist": "webpack --config config/webpack.dist.js",
    "docs:sass": "sassdoc app/assets/styles docs/styles/"
  },
  "author": "Luis Couto <hello@luiscouto.pt>",
  "license": "ISC",
  "dependencies": {
    "babel-runtime": "^4.6.5",
    "es6-promise": "^2.0.1",
    "immutable": "^3.6.2",
    "marty": "^0.8.12",
    "react": "^0.12.2",
    "react-router": "^0.12.4"
  },
  "devDependencies": {
    "autoprefixer-loader": "^1.1.0",
    "babel-loader": "^4.0.0",
    "bower": "^1.3.12",
    "connect-history-api-fallback": "0.0.5",
    "css-loader": "^0.9.1",
    "extract-text-webpack-plugin": "^0.3.8",
    "file-loader": "^0.8.1",
    "html-webpack-plugin": "^1.1.0",
    "image-webpack-loader": "^1.2.0",
    "json-loader": "^0.5.1",
    "react-hot-loader": "^1.1.6",
    "sass-loader": "^0.4.0",
    "sassdoc": "^2.1.2",
    "style-loader": "^0.8.3",
    "svgo": "^0.5.0",
    "svgo-loader": "^1.1.0",
    "url-loader": "^0.5.5",
    "webpack": "^1.6.0",
    "webpack-dev-server": "^1.7.0"
  }
}


// dist

var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    folders = {
        APP: path.resolve(__dirname, '../app'),
        BUILD: path.resolve(__dirname, '../build'),
        BOWER: path.resolve(__dirname, '../app/bower_components'),
        NPM: path.resolve(__dirname, '../node_modules')
    };

module.exports = {

    cache: false,

    debug: false,

    // Just to be nice to newbies
    devtool: 'source-map',

    context: path.join(__dirname, '..', 'app'),

    entry: {
        main: './main.jsx'
    },

    output: {
        path: path.join(__dirname, '..', 'build'),
        publicPath: 'build/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js'
    },

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        root: [folders.NPM, folders.BOWER],
        extensions: ['', '.js', '.jsx'],
        modulesDirectory: ['node_modules', 'app/bower_components']
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
        new webpack.ProvidePlugin({ 'React': 'react/addons' }),
        // Define a global enviroment variable
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(path.resolve(__dirname, '../package.js').version),
            'ENV': JSON.stringify('production'),
            'NODE_ENV': JSON.stringify('production'),
            'process.env' : {
                'NODE_ENV' : JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('styles.[hash].css', { allChunks: true }),
        new HtmlWebpackPlugin({ template: path.resolve(folders.APP, 'index.html') }),
    ],

    module: {
        preLoaders: [
            { test: /\.svg$/, loader: 'svgo' }
        ],
        loaders: [{
                test: /\.s?css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', [
                    'css',
                    'autoprefixer?browsers=last 2 versions',
                    'sass?' + [
                        'includePaths[]=' + folders.BOWER,
                        'includePaths[]=' + path.resolve(folders.BOWER, 'fontawesome/scss/'),
                        'includePaths[]=' + path.resolve(folders.BOWER, 'fontawesome/fonts/'),
                        'includePaths[]=' + path.resolve(folders.BOWER, 'bourbon/app/assets/stylesheets'),
                        'includePaths[]=' + path.resolve(folders.BOWER, 'neat/app/assets/stylesheets'),
                        'outputStyle=compressed'
                    ].join('&')
                ].join('!'))
            },
            { test: /\.(json)$/, loader: 'json' },
            { test: /\.jsx?$/, loader: 'babel?optional=runtime&experimental', exclude: /node_modules/ },
            { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
            { test: /\.(jpg|png|gif)$/, loaders: ['url', 'image?optimizationLevel=8&progressive=true' ]  }
        ]
    }
};
