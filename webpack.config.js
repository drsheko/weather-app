const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var moment = require('moment-timezone');

module.exports = {
  mode: 'development',
  plugins: [

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      attributes: {
        id: 'target',
        'data-target': 'example',
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    
  },
  devtool: 'source-map',

  devServer: {
    static: './dist',
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use:  [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../",
              },
            },
            "css-loader",
          ],
      },
    ],
  },
};