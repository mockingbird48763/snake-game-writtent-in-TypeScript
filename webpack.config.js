const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    clean: true,
    // 兼容 ie10，如果你需要
    // environment: {
    //   arrowFunction: false,
    //   const: false
    // },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: [
                    'last 2 version',
                    '> 1%'
                  ],
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ],
          }
        },
        'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [[
                  'postcss-preset-env',
                  {
                    browserslist: [
                      'last 2 versions',
                      '> 1%'
                    ]
                  }
                ]]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}