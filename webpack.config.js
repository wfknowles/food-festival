// npm i -D webpack-bundle-analyzer
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack")
const path = require("path");

module.exports = {
    entry: {
        // chunked assets
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
    },
    module: {
        rules: [
          {
            test: /\.jpg$/i,
            use: [
                {
                  // npm i -D file-loader
                  loader: 'file-loader',
                  options: {
                    esModule: false,
                    name(file) {
                      return '[path][name].[ext]';
                    },
                    publicPath: function(url) {
                      return url.replace('../', '/assets/');
                    }
                  }
                },
                { 
                  // npm i image-webpack-loader
                  loader: 'image-webpack-loader'
                }
            ]
          }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
        analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        })
    ],
    mode: "development"
};