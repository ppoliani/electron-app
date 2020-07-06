const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const envPath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`);

const parseStringifiedEnv = envPath => {
  const stringifiedEnv = Object.keys(parseEnv(envPath))
    .reduce((acc, curr) => ({
      ...acc,
      [`process.env.${curr}`]: JSON.stringify(process.env[curr])
    }), {});

  return stringifiedEnv;
};

const parseEnv = envPath => {
  const parsed = fs.readFileSync(envPath, 'utf8');
  const buf = Buffer.from(parsed);
  const envObj = dotenv.parse(buf);

  return envObj;
};

module.exports = {
  entry: {
    app: './src/view/App.jsx'
  },

  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },

  node: {
    __dirname: false,
    __filename: false
  },

  target: 'electron-renderer',

  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  },

  plugins: [
    new webpack.DefinePlugin(parseStringifiedEnv(envPath)),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin()
  ],

  module: {
    rules: [{
      test: /\.html$/,
      exclude: /node_modules/,
      use: {
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // use this approach instead of .babelrc; so that we can transpile files
          // from the other folders outside the web project
          plugins: [
            '@babel/plugin-transform-runtime'
          ],
          presets: [
            ['@babel/preset-env', {
              modules: 'commonjs'
            }],
            '@babel/preset-react'
          ]
        }
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          mimetype: 'application/font-woff',
          name: 'fonts/[name].[ext]'
        }
      }
    },
    {
      test: /.(jpg|png)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: './images/[name]-[hash].[ext]'
        }
      }
    }]
  }
}
