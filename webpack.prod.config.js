var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {

  return {
    devtool: 'cheap-module-source-map',
    mode: 'production',
    entry: [
      "whatwg-fetch",
      './app/index'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: ""
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        hash: true,
        filename: "index.html"
      }),
      new webpack.DefinePlugin({
        "env": {
          API_HOST: JSON.stringify(env.API_HOST),
          STRIPE_KEY: JSON.stringify(env.STRIPE_KEY)
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
          include: path.join(__dirname, 'app')
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        }
      ]
    },

    resolve: {
      extensions: [ '*', '.js' ]
    }
  }
}
