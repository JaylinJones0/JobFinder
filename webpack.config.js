const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "./client/index.jsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [
              [
                "@babel/preset-env",
                [
                  "babel/preset-react", // issue here
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: './client/index.html'
  })]
};
