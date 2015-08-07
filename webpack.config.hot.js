var base = require('./webpack.config.js');

module.exports = {
  entry: [
    "webpack/hot/only-dev-server",
    "./src/entry.js"
  ],
  output: {
    filename: "dest/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ],
  },
  devtool: "source-map"
};
