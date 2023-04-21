const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/script.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // path: __dirname + "/dist",
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};

// module: {
//   rules: [
//     {
//       test: /\.css$/,
//       use: ["style-loader", "css-loader"],
//     },
//     {
//       test: /\.(png|svg|jpg|gif)$/,
//       use: ["file-loader"],
//     },
//     {
//       test: /\.html$/,
//       use: ["html-loader"],
//     },
//   ];
// }
