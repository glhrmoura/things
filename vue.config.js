const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/mixins.scss";
        `
      }
    }
  },
  configureWebpack: {
    plugins: [
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        filter: ({ name }) => !name.endsWith('.map')
      })
    ]
  }
};
