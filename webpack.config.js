const path = require('path');
var webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true
                }
              }
            }, 
            {
                test: /\.s?css$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },
            {
              test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
              use: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
              test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              use: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              use: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              use: "file-loader"
            }, {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              use: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
          ]
    },
    resolve: {
        modules: ['node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        })
      ]
};