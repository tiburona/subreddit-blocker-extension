import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
    extensions: ['.ts', '.js']
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