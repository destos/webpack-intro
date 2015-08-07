var base = require('./webpack.config.js');

module.exports = {
  entry: [
    "webpack/hot/only-dev-server",
    "./src/entry.js"
  ],
  output: {
    filename: "dest/bundle.js"
  },
  module: base.module,
  devtool: "source-map"
};
