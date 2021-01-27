const { resolve } = require("path");

module.exports = {
    entry: "./src/js/main.jsx",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["@babel/react"]
                }
            }]
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, "./devBuild/js")
    },
    mode: "development",
    target: "node"
};