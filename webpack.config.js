const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./app.js",
    watch: true,
    output:{
        path: path.resolve('./dist'),
        filename: "main.js"
    },
    module:{
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            { 
                test:/\.(scss|css)$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    mode: 'development'
}