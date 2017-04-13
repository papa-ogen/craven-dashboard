'use strict';

const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');


const DIST_PATH = path.resolve( __dirname, 'dist' );
const SOURCE_PATH = path.resolve( __dirname, 'src' );

module.exports = {
  entry: SOURCE_PATH + '/app/app.js',
  output: {
      path: DIST_PATH,
      filename: 'app.dist.js',
      publicPath: '/app/'
  },
  module: {
      loaders: [{
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: [
                'es2015',
                'stage-2'
            ]
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: /flexboxgrid/
      }
    ]
  },
  plugins: [
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss'
    }),
  ]
};
