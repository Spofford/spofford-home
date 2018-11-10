var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: [
    "whatwg-fetch",
    'webpack-dev-server/client?http://localhost:3000',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      hash: true,
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      "env": {
        API_HOST: JSON.stringify('http://localhost:4000')
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
