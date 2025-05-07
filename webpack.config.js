const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: {
        reddit: './src/reddit.ts',
        background: './src/background.ts',
        gmail: './src/gmail.ts',
        popup: './src/popup.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
              test: /\.ts$/,
              exclude: /__tests__/,
              use: 'ts-loader'
            }
          ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'static/manifest.json', to: 'manifest.json' },
                { from: 'static/icons', to: 'icons' }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './static/popup.html',
            filename: 'popup.html',
            chunks: ['popup'],
            inject: 'body'
        })
    ]
};