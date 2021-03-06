var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const entryPath = "./entry-webpack.js";


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
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new UglifyJsPlugin({
            include: /\.min\.js$/
        })

    ],
    entry: {
        "bundle": entryPath,
        "bundle.min": entryPath
    },

    devtool: "source-map",
    output: {
        path: __dirname,
        filename: "./dist/[name].js"
    }
};