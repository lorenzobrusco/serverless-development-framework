const path = require('path');
const glob = require('glob');
const TerserPlugin = require("terser-webpack-plugin");

const entryArray = glob.sync('./app/index.ts');

const entryObject = entryArray.reduce((acc, item) => {
    let name = path.dirname(item.replace("app", ""))
    acc[name] = item
    return acc;
}, {});

module.exports = {
    entry: entryObject,
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'babel-loader',
                exclude: ['/node_modules/', '/tests/']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: ['/node_modules/', '/tests/']
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true
                }
              })
            ]
      },
    externals: process.env.NODE_ENV === "development" ? [] : ["aws-sdk"],
    mode: process.env.NODE_ENV || "production",
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    }
};