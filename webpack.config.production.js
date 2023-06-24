const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

module.exports = {
  mode: "production",
  //entry point for your react application
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  //output path -> dist/static
  output: {
    filename: "static/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //matches .js .jsx file
        exclude: [/node_modules/], // exclude node_modules from processing
        use: {
          /**
           * Babel loader converts Modern JS (ES6), JSX to OLD JS
           * loader: "babel-loader" -> uses babel loader for the specified file type
           * preset: a set of plugins used to support particular language features
           */
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|json|ico)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  /**
   * Resolve helps to locate imported modules.
   * Look into - https://webpack.js.org/configuration/resolve/#resolveextensions
   */
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  // plugins are like 3rd party application to boost your react application
  plugins: [
    /**
     * HtmlWebpackPlugin - Generate HTML5 index.html file in dist / index.html
     * Includes all webpack bundles in <script> tag.
     */
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
      inject: true,
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        useShortDoctype: true,
      },
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG: false,
      REACT_APP_API_URL: "https://jira-api.ivorreic.com/",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
    }),

    /**
     * MiniCssExtractPlugin - extract css into separate files.
     * dist\styles
     */

    new MiniCssExtractPlugin({ filename: "styles/[name].[contenthash].css" }),

    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, "dist"),
      src: "index.html",
      dest: "index.html",
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),

    new CleanWebpackPlugin(),
  ],
};
