const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { default: test } = require('node:test');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main']
      }),
      // new HtmlWebpackPlugin({
      //   template: './src/install.html',
      //   filename: 'install.html',
      //   chunks: ['install']
      // }),
      new WebpackPwaManifest({
        name: 'Another Note Taker',
        short_name: 'ATE',
        description: 'A simple note taking app',
        background_color: '#135C15',
        theme_color: '#2D3142',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        }
        ]
      }),
      new InjectManifest({
        swSrc: './src/src-sw.js',
        swDest: 'src-sw.js'
      })

    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }

      ],
    },
  };
};


