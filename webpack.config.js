module.exports = {
  entry: "./src/entry.js",
  output: {
      path: __dirname + '/dest/',
      filename: "bundle.js"
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
    ]
  },
  devtool: "source-map"
};
