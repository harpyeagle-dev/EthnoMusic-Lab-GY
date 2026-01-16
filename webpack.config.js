const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    // Use automatic publicPath so assets resolve correctly in GitHub Pages subpaths
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false,
      "crypto": false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'EthnoMusic Lab GY'
    }),
    new HtmlWebpackPlugin({
      template: './src/explore.html',
      filename: 'explore.html',
      title: 'Explore Cultures - EthnoMusic Lab GY'
    }),
    new HtmlWebpackPlugin({
      template: './src/analyze.html',
      filename: 'analyze.html',
      title: 'Analyze Music - EthnoMusic Lab GY'
    }),
    new HtmlWebpackPlugin({
      template: './src/learn.html',
      filename: 'learn.html',
      title: 'Learn & Play - EthnoMusic Lab GY'
    }),
    new HtmlWebpackPlugin({
      template: './src/create.html',
      filename: 'create.html',
      title: 'Create Music - EthnoMusic Lab GY'
    }),
    new HtmlWebpackPlugin({
      template: './src/educators.html',
      filename: 'educators.html',
      title: 'For Educators - EthnoMusic Lab GY'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '.' },
        { from: 'src/sw.js', to: '.' },
        { from: 'src/404.html', to: '.' },
        // Make the Essentia WASM binary available at runtime (web build)
        { from: 'node_modules/essentia.js/dist/essentia-wasm.web.wasm', to: '.' },
        // Optional: copy local TF.js models if present
        { from: 'public/models', to: 'models', noErrorOnMissing: true },
        // ONNX Runtime Web assets (wasm backends)
        { from: 'node_modules/onnxruntime-web/dist/*', to: 'ort/[name][ext]', noErrorOnMissing: true }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true
  }
};
