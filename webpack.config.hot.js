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
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    devtool: "source-map"
};
