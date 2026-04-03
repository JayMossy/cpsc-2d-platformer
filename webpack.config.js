const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let production = process.env.NODE_ENV === "production";

let config = {
    mode: "development",
    entry: "./src/root.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devServer: {
        static: "./dist"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /(\.tsx$|\.ts$)/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/images", to: "images" },
                { from: "./src/bootstrap", to: "bootstrap" },
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        })
    ]
}

if (production) {
    config.mode = "production";
    config.plugins = [
        new CopyPlugin({
            patterns: [
                { from: "./src/images", to: "images" },
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        })
    ];
}

module.exports = config;