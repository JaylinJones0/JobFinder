const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  //entry:
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist'),
  // }
  rules: [
    {
      test: /\.(?:js|jsx|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {

          targets: "defaults",
          presets: [
            ['@babel/preset-env', ['babel/preset-react', {
              'runtime': 'automatic'
            }]]
          ]
        }
      }
    }
  ],
  plugins: [new HtmlWebpackPlugin()]
}

