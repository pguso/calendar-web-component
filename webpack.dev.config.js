const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const projectPath = path.resolve(__dirname, './dist')
module.exports = {
  entry: {
    app: ['core-js/stable', './src/index.ts'],
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: projectPath,
    publicPath: '',
  },
  devServer: {
    contentBase: projectPath,
    index: 'index.html',
    port: 8081,
    writeToDisk: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'extra/**/*'),
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Test App',
      template: 'src/index.hbs',
      filename: 'index.html',
    }),
  ],
}
