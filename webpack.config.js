const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// const dev = process.env.NODE_ENV !== 'production'

const optimization = {
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          // removing comments
          comments: false,
        },
        compress: {
          // remove warnings
          warnings: false,
          // remove console.logs
          drop_console: true,
        },
      },
    }),
  ],
}

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              'targets': {
                'node': '10',
              },
            },],],
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  mode: 'production',
  target: 'node',
  // optimization,
}
