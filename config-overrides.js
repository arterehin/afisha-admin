const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@app': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@redux': path.resolve(__dirname, 'src/redux'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@utils': path.resolve(__dirname, 'src/utils')
  }),
  addWebpackPlugin(
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/tinymce/skins',
          to: 'static/js/skins'
        }
      ]
    })
  )
)