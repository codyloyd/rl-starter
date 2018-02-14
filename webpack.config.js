const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/assets/game.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
    // new UglifyJSPlugin()
  ],
  devServer: {
    port: 5678
  },
  module: {
    rules: [
      {
        test: /\.mp3$/,
        loader: "file-loader"
      }
    ]
  }
};
