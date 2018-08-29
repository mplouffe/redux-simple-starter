const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  let env;
  if (process.env.NODE_ENV === 'test') {
      env = dotenv.config({ path: '.env.test' }).parsed;
  } else if (process.env.NODE_ENV === 'development') {
      env = dotenv.config({ path: '.env.development.local' }).parsed;
  }

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: 'development',
    entry: ['./src/index.js'],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ],
    node: {
      fs: "empty"
    }
  };
}
