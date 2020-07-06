const merge = require('webpack-merge');
const {spawn} = require('child_process');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    port: process.env.PORT,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        {
          from: /./,
          to: './src/view/index.html'
        }
      ]
    },
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(0))
      .on('error', spawnError => console.error(spawnError))
    }
  }
});
