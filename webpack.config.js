const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',//入口文件 从这里开始读取信息
  output: {
        path: path.resolve(__dirname, 'dist'),//打包文件放置的位置
        publicPath:'/dist/',
        filename: 'js/app.js'
  },
  module: {
    rules: [
        // jsx文件处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
    //   css文件处理
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader" 
          })
      },
    //   sass文件处理
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader","sass-loader"] 
          })
      },
    //   图片处理
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            },
          },
        ],
      },
    //   加载字体
        {
        test: /\.(woff|woff2|eot|ttf|otf|svg|otf)$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                  limit: 8192,
                  name:'resource/[name].[ext]'
                },
              },
            ]
        }
    ]
  },
  plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        })

        
    ],
    devServer: {
       
      },
};