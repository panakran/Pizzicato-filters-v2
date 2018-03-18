var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

module.exports = {
    context: path.join(__dirname, ''),
        mode: 'development',
    module: {
        rules: [
            {
//                css loader 
//                ex. require('./node_modules/bootstrap/dist/css/bootstrap.css'); webpak entry
//                import 'bootstrap/dist/css/bootstrap.min.css'; start of angular module
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {// used to support all browsers @https://webpack.js.org/loaders/babel-loader/
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, //used to load bootstrap extra files used in app
                loader: 'url-loader?limit=100000'
            }
//            {
//                html template loader 
//                ex. require("./js/bootstrap/bootstrap.html"); on webpack entry
//                function loadTemplates($templateCache) {  IN DIRECTIVE
//                    $templateCache.put('bootstrap.html', require('./bootstrap.html'));
//                }
//                template: $templateCache.get('bootstrap.html')
//                test: /\.(html)$/,
//                use: {
//                    loader: 'raw-loader'
//                }
//            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })

    ],

    entry: "./entry-webpack.js",
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    }
};