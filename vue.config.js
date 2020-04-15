const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["javascript", "json", "typescript"]
      })
    ]
  },
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Unofficial TypeScript Playground",
    themeColor: "#007ACC",
    msTileColor: "#007ACC",
    manifestOptions: {
      short_name: "TS Playground"
    }
  }
};
