const webpack = require('webpack');

module.exports = {
  entry: './reactApp/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'SERVER_URL': JSON.stringify(process.env.SERVER_URL)
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
