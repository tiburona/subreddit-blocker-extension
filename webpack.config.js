const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    'mode': 'production',
    entry: {
        content: './src/content.ts',
        background: './src/background.ts',
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{ test: /\.ts$/, use: 'ts-loader'}]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'static/manifest.json',
                    to: 'manifest.json'
                },
                {
                    from: 'static/icons',
                    to: 'icons'
                },
                {
                    from: 'static/popup.html',
                    to: 'popup.html'
                }
            ]
        })
    ]
};