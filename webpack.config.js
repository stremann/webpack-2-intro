const path = require('path');
const webpack = require('webpack');

const HtmlwebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: {
        vendor: ['lodash'], // You could get rid of it, check minChunks key in CommonsChunkPlugin config

        // or instead of minChunks function use this:
        //vendor: Object.keys(require('./package.json').dependencies),
        main: ['./src/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['latest']
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlwebpackPlugin({
            title: 'Intro to Webpack 2',
            template: './src/index.hbs' // ejs-loader kicks in by default
        }),
        new UglifyJsPlugin({
            beautify: false,
            mangle: {screw_ie8: true},
            compress: {screw_ie8: true, warnings: false},
            comments: false
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].bundle.js',
            // This will bundle any js files that have “node_modules” in their file paths (i.e. all your third-party stuff) into the vendor chunk.
            // You don’t to worry about having to keep entry.vendor up to date, every time you add a new third-party package. (You can get rid of entry.vendor in fact.)
            minChunks: (module) => {
                const userRequest = module.userRequest; // module.userRequest returns name of file, including path
                return userRequest && userRequest.match(/.js$/) && userRequest.indexOf('node_modules') >= 0;
            }
        })
    ]
};
