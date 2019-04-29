const path = require("path")

module.exports = {
  optimization: {
    // We no not want to minimize our code.
    // minimize: false
  },
  resolve: {
    alias: {
      "#graphql": path.resolve(__dirname, "src/graphql/"),
      "#utils": path.resolve(__dirname, "src/utils/")
    },
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".ts",
      ".tsx",
      ".mjs",
      ".graphql",
      ".gql"
    ]
  },
  node: {
    __dirname: true
  },
  target: "node",
  externals: {
    sharp: "commonjs sharp"
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [{ loader: "graphql-tag/loader" }]
      }
    ]
  }
}
