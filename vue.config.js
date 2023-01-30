const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `
  //         @import "@/scss/_variables.scss";
  //       `
  //     }
  //   }
  // }
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
        `
      }
    }
  }
};
