const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'shamir_protocols.js',
        path: path.resolve(__dirname, 'bin')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /\.json$/,
            use: {
                loader: 'babel-loader',
                options: {
                    "presets": ["@babel/preset-env"]
                }
            }
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ],
  },
};
