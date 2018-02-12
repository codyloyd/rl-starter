const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
  plugins: [new UglifyJSPlugin()]
});
