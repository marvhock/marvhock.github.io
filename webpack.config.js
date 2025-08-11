const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Babel 7
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    // WICHTIG: keine führenden Slashes -> relatives Ziel im Projekt
    path: path.join(__dirname, 'static', 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '',
    clean: true
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new AssetsPlugin({
      filename: 'webpack_assets.json',
      path: path.join(__dirname, 'data'),
      prettyPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ],
  stats: 'minimal'
};
