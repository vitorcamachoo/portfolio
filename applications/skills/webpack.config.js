const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "http://localhost:3002/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "skills",
      library: { type: "var", name: "skills" },
      shared: ["react", "react-dom", "react-router-dom"],
      filename: "remoteEntry.js",
      exposes: {
        App: "./src/App",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
